import Task from '@harlem/task';

import {
    SENDER,
    EVENTS,
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
    ActionBody,
    ActionEventData,
    ActionHookHandler,
    ActionOptions,
    ActionPredicate,
    ActionStoreState,
} from './types';

export {
    ActionAbortError,
} from './errors';

export * from './types';

export default function actionsExtension<TState extends BaseState>() {
    return (store: InternalStore<TState>) => {
        const _store = store as unknown as InternalStore<TState & ActionStoreState>;

        _store.write('$action-init', SENDER, state => state.$actions = {}, true);

        function setActionState(state: TState & ActionStoreState, name: string) {
            state.$actions[name] = {
                runCount: 0,
                instances: new Map(),
                errors: new Map(),
            };
        }

        function registerAction(name: string) {
            _store.register('actions', name, () => () => {});
            _store.write('$action-register', SENDER, state => setActionState(state, name), true);
        }

        function incrementRunCount(name: string) {
            _store.write('$action-increment-run-count', SENDER, state => state.$actions[name].runCount += 1);
        }

        function addInstance(name: string, instanceId: symbol, payload: unknown) {
            _store.write('$action-add-instance', SENDER, state => state.$actions[name]?.instances.set(instanceId, payload));
        }

        function removeInstance(name: string, instanceId: symbol) {
            _store.write('$action-remove-instance', SENDER, state => state.$actions[name]?.instances.delete(instanceId));
        }

        function addError(name: string, instanceId: symbol, error: unknown) {
            _store.write('$action-add-error', SENDER, state => state.$actions[name]?.errors.set(instanceId, error));
        }

        function clearErrors(name: string) {
            _store.write('$action-clear-errors', SENDER, state => state.$actions[name]?.errors.clear());
        }

        function action<TPayload, TResult = void>(name: string, body: ActionBody<TState, TPayload, TResult>, options?: Partial<ActionOptions>): Action<TPayload, TResult> {
            registerAction(name);

            const tasks = new Set<Task<TResult>>();

            const {
                parallel,
                autoClearErrors,
            } = {
                parallel: false,
                autoClearErrors: true,
                ...options,
            };

            const mutate = (mutator: Mutator<TState, undefined, void>) => _store.write(name, SENDER, mutator);
            const emit = (event: string, payload: unknown, result?: unknown) => _store.emit(event, SENDER, {
                action: name,
                payload,
                result,
            } as ActionEventData);

            return ((payload: TPayload, controller?: AbortController) => {
                if (!parallel && tasks.size > 0) {
                    tasks.forEach(task => {
                        task.abort();
                        tasks.delete(task);
                    });
                }

                if (autoClearErrors) {
                    clearErrors(name);
                }

                const task = new Task<TResult>(async (resolve, reject, controller, onAbort) => {
                    const id = Symbol(name);

                    const complete = () => (tasks.delete(task), removeInstance(name, id));
                    const fail = () => reject(new ActionAbortError(name, id));

                    let result: TResult | undefined;

                    onAbort(() => (complete(), fail()));
                    addInstance(name, id, payload);

                    emit(EVENTS.action.before, payload);

                    try {
                        const providedPayload = _store.providers.payload(payload) ?? payload;

                        result = await body(providedPayload, mutate, controller, onAbort);

                        emit(EVENTS.action.success, payload, result);
                        incrementRunCount(name);
                        resolve(result);
                    } catch (error) {
                        if (error instanceof DOMException) {
                            return fail(); // Fetch has been cancelled
                        }

                        emit(EVENTS.action.error, payload);

                        incrementRunCount(name);
                        addError(name, id, error);
                        reject(error);
                    } finally {
                        emit(EVENTS.action.after, payload, result);
                        complete();
                    }
                }, controller);

                tasks.add(task);

                return task;
            }) as Action<TPayload, TResult>;
        }

        function getActionHook(eventName: string) {
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
            return _store.state.$actions[name].runCount > 0;
        }

        function isActionRunning<TPayload = unknown>(name: string, predicate?: ActionPredicate<TPayload>) {
            const {
                instances,
            } = _store.state.$actions[name];

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
            return _store.state.$actions[name]?.errors.size > 0;
        }

        function getActionErrors(name: string) {
            return Array
                .from(_store.state.$actions[name]?.errors.entries())
                .map(([id, error]) => ({
                    id,
                    error,
                }));
        }

        function resetActionState(name?: string | string[]) {
            const names = ([] as string[]).concat(name || Object.keys(_store.state.$actions));

            _store.write('$action-reset-state', SENDER, state => names.forEach(name => {
                if (name in state.$actions) {
                    setActionState(state, name);
                }
            }));
        }

        const onBeforeAction = getActionHook(EVENTS.action.before);
        const onAfterAction = getActionHook(EVENTS.action.after);
        const onActionSuccess = getActionHook(EVENTS.action.success);
        const onActionError = getActionHook(EVENTS.action.error);

        return {
            action,
            hasActionRun,
            isActionRunning,
            whenActionIdle,
            hasActionFailed,
            getActionErrors,
            resetActionState,
            onBeforeAction,
            onAfterAction,
            onActionSuccess,
            onActionError,
        };
    };
}