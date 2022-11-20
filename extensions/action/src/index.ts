import Task from '@harlem/task';

import {
    SENDER,
} from './constants';

import {
    reactive,
    watchEffect,
} from 'vue';

import {
    ActionAbortError,
} from './errors';

import {
    getAbortMessage,
} from './utilities';

import {
    BaseState,
    EVENTS,
    InternalStore,
    Mutator,
    TriggerEventData,
} from '@harlem/core';

import {
    typeIsFunction,
} from '@harlem/utilities';

import type {
    Action,
    ActionAbortStrategies,
    ActionBody,
    ActionOptions,
    ActionPredicate,
    ActionState,
    Options,
} from './types';

export { ActionAbortError } from './errors';

export * from './types';

export const ABORT_STRATEGY = {
    error: (name, id, resolve, reject, reason) => {
        reject(new ActionAbortError(name, id, reason));
    },
    warn: (name, id, resolve, reject, reason) => {
        console.warn(getAbortMessage(name, reason));
        resolve();
    },
} as ActionAbortStrategies;

function getOptions(options?: Partial<Options>): Options {
    return {
        concurrent: true,
        ...options,

        strategies: {
            abort: ABORT_STRATEGY.error,
            ...options?.strategies,
        },
    };
}

export default function actionExtension<TState extends BaseState>(options?: Partial<Options>) {
    const rootOptions = getOptions(options);

    return (store: InternalStore<TState>) => {
        store.register('extensions', 'action', () => rootOptions);

        const actionState = reactive(new Map<string, ActionState>());

        function setActionState<TPayload = unknown, TResult = unknown>(name: string) {
            const state = {
                runCount: 0,
                tasks: new Set(),
                instances: new Map(),
                errors: new Map(),
            } as ActionState<TPayload, TResult>;

            actionState.set(name, state);

            return state;
        }

        function getActionState<TPayload = unknown, TResult = unknown>(name: string) {
            return (actionState.get(name) || setActionState(name)) as ActionState<TPayload, TResult>;
        }

        function updateActionState(name: string, producer: (currentState: ActionState) => Partial<ActionState>) {
            const currentState = actionState.get(name);

            if (!currentState) {
                return;
            }

            const newState = producer(currentState);

            if (newState !== currentState) {
                actionState.set(name, {
                    ...currentState,
                    ...newState,
                });
            }
        }

        function registerAction(name: string, options: Partial<ActionOptions<any>> = {}) {
            store.register('actions', name, () => options);
            return setActionState(name);
        }

        function action<TPayload, TResult = void>(name: string, body: ActionBody<TState, TPayload, TResult>, options?: Partial<ActionOptions<TPayload>>): Action<TPayload, TResult> {
            registerAction(name, options);

            const {
                concurrent,
                autoClearErrors,
                strategies,
            } = {
                autoClearErrors: true,

                ...rootOptions,
                ...options,

                strategies: {
                    ...rootOptions.strategies,
                    ...options?.strategies,
                },
            } as ActionOptions<TPayload>;

            const mutate = (mutator: Mutator<TState, undefined, void>) => store.write(name, SENDER, mutator);
            const incrementRunCount = () => updateActionState(name, ({ runCount }) => ({
                runCount: runCount + 1,
            }));

            return ((payload: TPayload, controller?: AbortController) => {
                const {
                    tasks,
                    instances,
                    errors,
                } = getActionState<TPayload, TResult>(name);

                if (!concurrent || (typeIsFunction(concurrent) && !concurrent(payload, Array.from(instances.values())))) {
                    abortAction(name, 'New instance started on non-concurrent action');
                }

                if (autoClearErrors) {
                    errors.clear();
                }

                const task = new Task<TResult>(async (resolve, reject, controller, onAbort) => {
                    const id = Symbol(name);

                    const complete = () => (tasks.delete(task), instances.delete(id));
                    const fail = (reason?: unknown) => strategies.abort(name, id, resolve, reject, reason);

                    let result: TResult;

                    const trigger = (event: string) => store.emit(event, SENDER, {
                        name,
                        payload,
                        result,
                    } as TriggerEventData);

                    onAbort(reason => (complete(), fail(reason)));
                    instances.set(id, payload);

                    trigger(EVENTS.action.before);

                    try {
                        const providedPayload = store.providers.payload(payload) ?? payload;

                        result = await body(providedPayload, mutate, controller, onAbort);

                        trigger(EVENTS.action.success);

                        incrementRunCount();
                        resolve(result);
                    } catch (error) {
                        if (isActionAbortError(error)) {
                            return fail(error.message);
                        }

                        if (error instanceof DOMException) {
                            return fail('Network request cancelled'); // Fetch has been cancelled
                        }

                        trigger(EVENTS.action.error);

                        incrementRunCount();
                        errors.set(id, error);
                        reject(error);
                    } finally {
                        trigger(EVENTS.action.after);
                        complete();
                    }
                }, controller);

                tasks.add(task);

                return task;
            }) as Action<TPayload, TResult>;
        }

        function hasActionRun(name: string) {
            return getActionState(name).runCount > 0;
        }

        function isActionRunning<TPayload = unknown>(name: string, predicate?: ActionPredicate<TPayload>) {
            const payloads = Array.from(getActionState<TPayload>(name).instances.values());
            return !!payloads.length && (!predicate || payloads.some(predicate));
        }

        function isActionFirstRun(name: string) {
            return !hasActionRun(name) && isActionRunning(name);
        }

        function whenActionIdle<TPayload = unknown>(name: string, predicate?: ActionPredicate<TPayload>, controller?: AbortController): Task<void> {
            return new Task((resolve, reject, controller, onAbort) => {
                const isComplete = () => !isActionRunning(name, predicate);

                if (isComplete()) {
                    return resolve();
                }

                const unwatch = watchEffect(() => {
                    if (isComplete()) {
                        unwatch();
                        resolve();
                    }
                });

                onAbort(() => (unwatch(), resolve()));
            }, controller);
        }

        function hasActionFailed(name: string) {
            return !!getActionState(name).errors.size;
        }

        function getActionErrors(name: string) {
            const errors = Array.from(getActionState(name).errors);

            return errors.map(([id, error]) => ({
                id,
                error,
            }));
        }

        function isActionAbortError(value: unknown): value is ActionAbortError {
            return value instanceof ActionAbortError;
        }

        function resetActionState(name?: string | string[]) {
            ([] as string[])
                .concat(name || Array.from(actionState.keys()))
                .forEach(name => setActionState(name));
        }

        function abortAction(name: string | string[], reason?: unknown) {
            ([] as string[])
                .concat(name)
                .forEach(name => {
                    const {
                        tasks,
                    } = getActionState(name);

                    if (tasks.size) {
                        tasks.forEach(task => {
                            task.abort(reason);
                            tasks.delete(task);
                        });
                    }
                });
        }

        function suppressAbortError<TPayload, TResult>(action: Action<TPayload, TResult>) {
            return ((payload: TPayload, controller?: AbortController) => {
                return new Task<TResult | void>(async (resolve, reject, controller, onAbort) => {
                    onAbort(() => resolve());

                    try {
                        const result = await action(payload, controller);
                        resolve(result);
                    } catch (error) {
                        isActionAbortError(error)
                            ? resolve()
                            : reject(error);
                    }
                }, controller);
            }) as Action<TPayload, TResult | undefined>;
        }

        return {
            action,
            abortAction,
            getActionErrors,
            hasActionFailed,
            hasActionRun,
            isActionAbortError,
            isActionFirstRun,
            isActionRunning,
            resetActionState,
            suppressAbortError,
            whenActionIdle,
        };
    };
}