import {
    InternalStore,
    Mutator
} from '@harlem/core';

import type {
    Action,
    ActionBody,
    ActionPredicate,
    ActionStoreState,
    AddActionInstancePayload,
    RemoveActionInstancePayload
} from './types';

export * from './types';

export default function actionsExtension<TState>(store: InternalStore<TState>) {
    
    const _store = store as unknown as InternalStore<TState & ActionStoreState>;

    _store.write('$add-actions', '$actions-extension', state => {
        state.$actions = {};
    });

    const addActionInstance = _store.mutation<AddActionInstancePayload>('$add-action-instance', (state, payload) => {
        const {
            actionName,
            instanceId,
            instancePayload
        } = payload;

        if (!state.$actions[actionName]) {
            state.$actions[actionName] = new Map<symbol, unknown>();
        }

        state.$actions[actionName].set(instanceId, instancePayload);
    });

    const removeActionInstance = _store.mutation<RemoveActionInstancePayload>('$remove-action-instance', (state, payload) => {
        const {
            actionName,
            instanceId,
        } = payload;

        if (!state.$actions[actionName]) {
            return;
        }

        state.$actions[actionName].delete(instanceId);
    });
     
    function action<TPayload, TResult = void>(name: string, body: ActionBody<TState, TPayload, TResult>): Action<TPayload, TResult> {
        const mutate = (mutator: Mutator<TState, undefined, void>) => _store.write(name, '$actions-extension', mutator);
        
        return (async (payload: TPayload) => {
            const id = Symbol(name);
    
            addActionInstance({
                actionName: name,
                instanceId: id,
                instancePayload: payload
            });

            let result: TResult;

            try {
                result = await body(payload, mutate);
            } finally {
                removeActionInstance({
                    actionName: name,
                    instanceId: id 
                });
            }

            return result;
        }) as Action<TPayload, TResult>;
    }

    function isActionRunning<TPayload = unknown>(name: string, predicate: ActionPredicate<TPayload> = () => true) {
        const instances = _store.state.$actions[name];

        return !!instances && Array
            .from(instances.values())
            .some(payload => predicate(payload as TPayload));
    }

    return {
        action,
        isActionRunning
    };

};