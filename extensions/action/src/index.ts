import Task from '@harlem/task';

import {
    SENDER,
    EVENTS,
    STATE_PROP,
} from './constants';

import {
    watchEffect,
} from 'vue';

import {
    BaseState,
    EventPayload,
    InternalStore,
    Mutator,
} from '@harlem/core';

import {
    ActionAbortError,
} from './errors';

import type {
    Action,
    ActionAbortStrategies,
    ActionBody,
    ActionEventData,
    ActionHookHandler,
    ActionOptions,
    ActionPredicate,
    ActionStoreState,
    Options,
} from './types';

export {
    ActionAbortError,
} from './errors';

export * from './types';

export const ABORT_STRATEGY = {
    error: (name, id, resolve, reject, reason) => {
        reject(new ActionAbortError(name, id, reason));
    },
    warn: (name, id, resolve, reject, reason) => {
        console.warn(`Action ${name} has been cancelled. Reason: ${reason || 'unknown'}`);
        resolve();
    },
} as ActionAbortStrategies;

export default function actionsExtension<TState extends BaseState>(options?: Partial<Options>) {
    const {
        strategies: rootStrategies,
    } = {
        ...options,
        strategies: {
            abort: ABORT_STRATEGY.error,
            ...options?.strategies,
        },
    };

    return (store: InternalStore<TState>) => {
        const _store = store as unknown as InternalStore<TState & ActionStoreState>;

        const actionTasks = new Map<string, Set<Task<unknown>>>();

        _store.write('$action-init', SENDER, state => state[STATE_PROP] = {}, true);

        function setActionState(state: TState & ActionStoreState, name: string) {
            state[STATE_PROP][name] = {
                runCount: 0,
                instances: new Map(),
                errors: new Map(),
            };
        }

        function registerAction(name: string) {
            _store.register('actions', name, () => () => {});
            _store.write('$action-register', SENDER, state => setActionState(state, name), true);

            const tasks = new Set<Task<unknown>>();

            actionTasks.set(name, tasks);

            return {
                tasks,
            };
        }

        function incrementRunCount(name: string) {
            _store.write('$action-increment-run-count', SENDER, state => state[STATE_PROP][name].runCount += 1);
        }

        function addInstance(name: string, instanceId: symbol, payload: unknown) {
            _store.write('$action-add-instance', SENDER, state => state[STATE_PROP][name]?.instances.set(instanceId, payload));
        }

        function removeInstance(name: string, instanceId: symbol) {
            _store.write('$action-remove-instance', SENDER, state => state[STATE_PROP][name]?.instances.delete(instanceId));
        }

        function addError(name: string, instanceId: symbol, error: unknown) {
            _store.write('$action-add-error', SENDER, state => state[STATE_PROP][name]?.errors.set(instanceId, error));
        }

        function clearErrors(name: string) {
            _store.write('$action-clear-errors', SENDER, state => state[STATE_PROP][name]?.errors.clear());
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
                    ...rootStrategies,
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

                    let result: TResult | undefined;

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

        function getActionTrigger(eventName: string) {
            return <TPayload = any, TResult = any>(actionName: string | string[], handler: ActionHookHandler<TPayload, TResult>) => {
                const actions = ([] as string[]).concat(actionName);

                return _store.on(eventName, (event?: EventPayload<ActionEventData<TPayload, TResult>>) => {
                    if (event && actions.includes(event.data.action)) {
                        handler(event.data);
                    }
                });
            };
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

                onAbort(() => {
                    unwatch();
                    resolve();
                });
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

        function isActionAbortError(value: unknown) {
            return value instanceof ActionAbortError;
        }

        function resetActionState(name?: string | string[]) {
            const names = ([] as string[]).concat(name || Object.keys(_store.state[STATE_PROP]));

            _store.write('$action-reset-state', SENDER, state => names.forEach(name => {
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

        const onBeforeAction = getActionTrigger(EVENTS.action.before);
        const onAfterAction = getActionTrigger(EVENTS.action.after);
        const onActionSuccess = getActionTrigger(EVENTS.action.success);
        const onActionError = getActionTrigger(EVENTS.action.error);

        return {
            action,
            hasActionRun,
            isActionRunning,
            whenActionIdle,
            hasActionFailed,
            getActionErrors,
            isActionAbortError,
            resetActionState,
            abortAction,
            onBeforeAction,
            onAfterAction,
            onActionSuccess,
            onActionError,
        };
    };
}