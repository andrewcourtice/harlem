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
    ActionEventData,
    BaseState,
    EVENTS,
    InternalStore,
    Mutator,
} from '@harlem/core';

import type {
    Action,
    ActionAbortStrategies,
    ActionBody,
    ActionOptions,
    ActionPredicate,
    ActionStoreState,
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
    const rootOptions = getOptions(options);

    return (store: InternalStore<TState>) => {
        store.register('extensions', 'action', () => rootOptions);

        const _store = store as unknown as InternalStore<TState & ActionStoreState>;

        const actionTasks = new Map<string, Set<Task<unknown>>>();

        _store.write(MUTATIONS.init, SENDER, state => state[STATE_PROP] = {}, true);

        function setActionState(state: TState & ActionStoreState, name: string) {
            state[STATE_PROP][name] = {
                runCount: 0,
                instances: new Map(),
                errors: new Map(),
            };
        }

        function registerAction(name: string) {
            _store.register('actions', name, () => () => {});
            _store.write(MUTATIONS.register, SENDER, state => setActionState(state, name), true);

            const tasks = new Set<Task<unknown>>();

            actionTasks.set(name, tasks);

            return {
                tasks,
            };
        }

        function incrementRunCount(name: string) {
            _store.write(MUTATIONS.incrementRunCount, SENDER, state => state[STATE_PROP][name].runCount += 1);
        }

        function addInstance(name: string, instanceId: symbol, payload: unknown) {
            _store.write(MUTATIONS.addInstance, SENDER, state => state[STATE_PROP][name]?.instances.set(instanceId, payload));
        }

        function removeInstance(name: string, instanceId: symbol) {
            _store.write(MUTATIONS.removeInstance, SENDER, state => state[STATE_PROP][name]?.instances.delete(instanceId));
        }

        function addError(name: string, instanceId: symbol, error: unknown) {
            _store.write(MUTATIONS.addError, SENDER, state => state[STATE_PROP][name]?.errors.set(instanceId, error));
        }

        function clearErrors(name: string) {
            _store.write(MUTATIONS.clearErrors, SENDER, state => state[STATE_PROP][name]?.errors.clear());
        }

        function action<TPayload, TResult = void>(name: string, body: ActionBody<TState, TPayload, TResult>, options?: Partial<ActionOptions>): Action<TPayload, TResult> {
            const {
                tasks,
            } = registerAction(name);

            const {
                parallel,
                autoClearErrors,
                strategies,
            } = {
                parallel: false,
                autoClearErrors: true,

                ...options,

                strategies: {
                    ...rootOptions.strategies,
                    ...options?.strategies,
                },
            } as ActionOptions;

            const mutate = (mutator: Mutator<TState, undefined, void>) => _store.write(name, SENDER, mutator);

            return ((payload: TPayload, controller?: AbortController) => {
                if (!parallel) {
                    abortAction(name, 'New instance started on non-parallel action');
                }

                if (autoClearErrors) {
                    clearErrors(name);
                }

                const task = new Task<TResult>(async (resolve, reject, controller, onAbort) => {
                    const id = Symbol(name);

                    const complete = () => (tasks.delete(task), removeInstance(name, id));
                    const fail = (reason?: unknown) => strategies.abort(name, id, resolve, reject, reason);

                    let result: TResult;

                    const emit = (event: string) => _store.emit(event, SENDER, {
                        action: name,
                        payload,
                        result,
                    } as ActionEventData);

                    onAbort(reason => (complete(), fail(reason)));
                    addInstance(name, id, payload);

                    emit(EVENTS.action.before);

                    try {
                        const providedPayload = _store.providers.payload(payload) ?? payload;

                        result = await body(providedPayload, mutate, controller, onAbort);

                        emit(EVENTS.action.success);

                        incrementRunCount(name);
                        resolve(result);
                    } catch (error) {
                        if (isActionAbortError(error)) {
                            return fail(error.message);
                        }

                        if (error instanceof DOMException) {
                            return fail('Network request cancelled'); // Fetch has been cancelled
                        }

                        emit(EVENTS.action.error);

                        incrementRunCount(name);
                        addError(name, id, error);
                        reject(error);
                    } finally {
                        emit(EVENTS.action.after);
                        complete();
                    }
                }, controller);

                tasks.add(task);

                return task;
            }) as Action<TPayload, TResult>;
        }

        function hasActionRun(name: string) {
            return _store.state[STATE_PROP][name].runCount > 0;
        }

        function isActionRunning<TPayload = unknown>(name: string, predicate?: ActionPredicate<TPayload>) {
            const {
                instances,
            } = _store.state[STATE_PROP][name];

            const payloads = Array.from(instances.values());

            return instances.size > 0 && (!predicate || payloads.some(payload => predicate(payload as TPayload)));
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
            return _store.state[STATE_PROP][name]?.errors.size > 0;
        }

        function getActionErrors(name: string) {
            return Array
                .from(_store.state[STATE_PROP][name]?.errors.entries())
                .map(([id, error]) => ({
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