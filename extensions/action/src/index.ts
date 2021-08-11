import Task from '@harlem/task';

import {
    SENDER,
} from './constants';

import {
    watchEffect,
} from 'vue';

import {
    BaseState,
    InternalStore,
    Mutator,
} from '@harlem/core';

import {
    ActionAbortError,
} from './errors';

import type {
    Action,
    ActionBody,
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

        _store.write('$action-init', SENDER, state => {
            state.$actions = {};
        });

        function registerAction(name: string) {
            _store.register('actions', name, () => undefined);
            _store.write('$action-register', SENDER, state => {
                state.$actions[name] = {
                    runCount: 0,
                    instances: new Map<symbol, unknown>(),
                };
            });
        }

        function clearActionRunCount(name: string) {
            _store.write('$action-clear-run-count', SENDER, state => state.$actions[name].runCount = 0);
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

        function action<TPayload, TResult = void>(name: string, body: ActionBody<TState, TPayload, TResult>, options?: Partial<ActionOptions>): Action<TPayload, TResult> {
            registerAction(name);

            const tasks = new Set<Task<TResult>>();

            const {
                parallel,
            } = {
                parallel: false,
                ...options,
            };

            const mutate = (mutator: Mutator<TState, undefined, void>) => _store.write(name, '$actions-extension', mutator);

            return ((payload: TPayload, controller?: AbortController) => {
                if (!parallel && tasks.size > 0) {
                    tasks.forEach(task => {
                        task.abort();
                        tasks.delete(task);
                    });
                }

                const task = new Task<TResult>(async (resolve, reject, controller, onAbort) => {
                    const id = Symbol(name);

                    const complete = () => (tasks.delete(task), removeInstance(name, id));
                    const fail = () => reject(new ActionAbortError(name, id));

                    onAbort(() => (complete(), fail()));
                    addInstance(name, id, payload);

                    try {
                        const providedPayload = _store.providers.payload(payload) ?? payload;
                        const result = await body(providedPayload, mutate, controller, onAbort);

                        resolve(result);
                        incrementRunCount(name);
                    } catch (error) {
                        if (error instanceof DOMException) {
                            fail(); // Fetch has been cancelled
                        }

                        reject(error);
                    } finally {
                        complete();
                    }
                }, controller);

                tasks.add(task);

                return task;
            }) as Action<TPayload, TResult>;
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

        return {
            action,
            hasActionRun,
            isActionRunning,
            whenActionIdle,
            clearActionRunCount,
        };
    };
}