import {
    Task,
} from '@harlem/utilities';

import {
    watchEffect,
} from 'vue';

import {
    InternalStore,
    Mutator,
} from '@harlem/core';

import type {
    Action,
    ActionBody,
    ActionOptions,
    ActionPredicate,
    ActionStoreState,
    AddActionInstancePayload,
    RemoveActionInstancePayload,
} from './types';

export * from './types';

export default function actionsExtension<TState>(store: InternalStore<TState>) {

    const _store = store as unknown as InternalStore<TState & ActionStoreState>;

    _store.write('$add-actions', '$actions-extension', state => {
        state.$actions = {};
    });

    const registerAction = _store.mutation('$register-action', (state, name: string) => {
        state.$actions[name] = {
            runCount: 0,
            instances: new Map<symbol, unknown>(),
        };
    });

    const clearActionRunCount = _store.mutation('$clear-run-count', (state, name: string) => state.$actions[name].runCount = 0);
    const incrementRunCount = _store.mutation('$increment-run-count', (state, name: string) => state.$actions[name].runCount += 1);

    const addInstance = _store.mutation<AddActionInstancePayload>('$add-action-instance', (state, payload) => {
        const {
            actionName,
            instanceId,
            instancePayload,
        } = payload;

        if (!state.$actions[actionName]) {
            return;
        }

        state.$actions[actionName].instances.set(instanceId, instancePayload);
    });

    const removeInstance = _store.mutation<RemoveActionInstancePayload>('$remove-action-instance', (state, payload) => {
        const {
            actionName,
            instanceId,
        } = payload;

        if (!state.$actions[actionName]) {
            return;
        }

        state.$actions[actionName].instances.delete(instanceId);
    });

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

                const complete = () => (tasks.delete(task), removeInstance({
                    actionName: name,
                    instanceId: id,
                }));

                onAbort(() => (complete(), reject()));
                addInstance({
                    actionName: name,
                    instanceId: id,
                    instancePayload: payload,
                });

                try {
                    const result = await body(payload, mutate, controller, onAbort);
                    resolve(result);

                    incrementRunCount(name);
                } catch (error) {
                    if (!(error instanceof DOMException)) {
                        reject(error);
                    }
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
    };
}