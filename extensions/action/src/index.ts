import Task from '@harlem/task';

import {
    MUTATIONS,
    SENDER,
    STATE_PROP,
} from './constants';

import {
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
    ReadState,
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
    ActionStoreState,
    ActionTaskState,
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
        ...options,

        strategies: {
            abort: ABORT_STRATEGY.error,
            ...options?.strategies,
        },
    };
}

export default function actionsExtension<TState extends BaseState>(options?: Partial<Options>) {
    type ActionState = TState & ActionStoreState;
    const rootOptions = getOptions(options);

    return (store: InternalStore<TState>) => {
        store.register('extensions', 'action', () => rootOptions);

        const _store = store as unknown as InternalStore<ActionState>;

        const actionTasks = new Map<string, Set<Task<unknown>>>();

        _store.write(MUTATIONS.init, SENDER, state => state[STATE_PROP] = {}, true);

        function getActionState(state: ActionState, name: string): ActionTaskState | undefined;
        function getActionState(state: ReadState<ActionState>, name: string): ReadState<ActionTaskState> | undefined;
        function getActionState(state: ActionState | ReadState<ActionState>, name: string) {
            return state[STATE_PROP][name];
        }

        function setActionState(state: ActionState, name: string) {
            state[STATE_PROP][name] = {
                runCount: 0,
                instances: new Map(),
                errors: new Map(),
            };
        }

        function registerAction(name: string, options: Partial<ActionOptions<any>> = {}) {
            _store.register('actions', name, () => options);
            _store.write(MUTATIONS.register, SENDER, state => setActionState(state, name), true);

            const tasks = new Set<Task<unknown>>();

            actionTasks.set(name, tasks);

            return {
                tasks,
            };
        }

        function incrementRunCount(name: string) {
            _store.write(MUTATIONS.incrementRunCount, SENDER, state => {
                const actionState = getActionState(state, name);

                if (actionState) {
                    actionState.runCount += 1;
                }
            });
        }

        function addInstance(name: string, instanceId: symbol, payload: unknown) {
            _store.write(MUTATIONS.addInstance, SENDER, state => getActionState(state, name)?.instances.set(instanceId, payload));
        }

        function removeInstance(name: string, instanceId: symbol) {
            _store.write(MUTATIONS.removeInstance, SENDER, state => getActionState(state, name)?.instances.delete(instanceId));
        }

        function addError(name: string, instanceId: symbol, error: unknown) {
            _store.write(MUTATIONS.addError, SENDER, state => getActionState(state, name)?.errors.set(instanceId, error));
        }

        function clearErrors(name: string) {
            _store.write(MUTATIONS.clearErrors, SENDER, state => getActionState(state, name)?.errors.clear());
        }

        function action<TPayload, TResult = void>(name: string, body: ActionBody<TState, TPayload, TResult>, options?: Partial<ActionOptions<TPayload>>): Action<TPayload, TResult> {
            const {
                tasks,
            } = registerAction(name, options);

            const {
                concurrent,
                autoClearErrors,
                strategies,
            } = {
                concurrent: (payload, runningPayloads) => !runningPayloads.includes(payload),
                autoClearErrors: true,

                ...options,

                strategies: {
                    ...rootOptions.strategies,
                    ...options?.strategies,
                },
            } as ActionOptions<TPayload>;

            const mutate = (mutator: Mutator<TState, undefined, void>) => _store.write(name, SENDER, mutator);
            const getPayloads = () => Array.from(getActionState(_store.state, name)?.instances.values() || []) as TPayload[];

            return ((payload: TPayload, controller?: AbortController) => {
                if (!concurrent || (typeIsFunction(concurrent) && !concurrent(payload, getPayloads()))) {
                    abortAction(name, `New instance started on non-concurrent action: ${name}`);
                }

                if (autoClearErrors) {
                    clearErrors(name);
                }

                const task = new Task<TResult>(async (resolve, reject, controller, onAbort) => {
                    const id = Symbol(name);

                    const complete = () => (tasks.delete(task), removeInstance(name, id));
                    const fail = (reason?: unknown) => strategies.abort(name, id, resolve, reject, reason);

                    let result: TResult;

                    const trigger = (event: string) => _store.emit(event, SENDER, {
                        name,
                        payload,
                        result,
                    } as TriggerEventData);

                    onAbort(reason => (complete(), fail(reason)));
                    addInstance(name, id, payload);

                    trigger(EVENTS.action.before);

                    try {
                        const providedPayload = _store.providers.payload(payload) ?? payload;

                        result = await body(providedPayload, mutate, controller, onAbort);

                        trigger(EVENTS.action.success);

                        incrementRunCount(name);
                        resolve(result);
                    } catch (error) {
                        if (isActionAbortError(error)) {
                            return fail(error.message);
                        }

                        if (error instanceof DOMException) {
                            return fail('Network request cancelled'); // Fetch has been cancelled
                        }

                        trigger(EVENTS.action.error);

                        incrementRunCount(name);
                        addError(name, id, error);
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
            const actionState = getActionState(_store.state, name);
            return !!actionState && actionState.runCount > 0;
        }

        function isActionRunning<TPayload = unknown>(name: string, predicate?: ActionPredicate<TPayload>) {
            const instances = getActionState(_store.state, name)?.instances;

            if (!instances) {
                return false;
            }

            return instances.size > 0 && (!predicate || Array.from(instances.values()).some(payload => predicate(payload as TPayload)));
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
            const actionState = getActionState(_store.state, name);
            return !!actionState && actionState.errors.size > 0;
        }

        function getActionErrors(name: string) {
            const actionState = getActionState(_store.state, name);
            const errors = Array.from(actionState?.errors?.entries() || []);

            return errors.map(([id, error]) => ({
                id,
                error,
            }));
        }

        function isActionAbortError(value: unknown): value is ActionAbortError {
            return value instanceof ActionAbortError;
        }

        function resetActionState(name?: string | string[]) {
            const names = ([] as string[]).concat(name || Object.keys(_store.state[STATE_PROP]));

            _store.write(MUTATIONS.resetState, SENDER, state => names.forEach(name => {
                if (name in state[STATE_PROP]) {
                    setActionState(state, name);
                }
            }));
        }

        function abortAction(name: string | string[], reason?: unknown) {
            ([] as string[])
                .concat(name)
                .forEach(name => {
                    const tasks = actionTasks.get(name);

                    if (tasks && tasks.size > 0) {
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