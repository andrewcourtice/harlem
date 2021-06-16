import {
    computed
} from 'vue';

import {
    Extension,
    InternalStore,
    createStore,
    Mutator
} from '@harlem/core';

import type {
    Action,
    ActionBody,
    ActionPredicate,
    ActionStoreState,
    AddActionInstancePayload,
    ComposedAction,
    RemoveActionInstancePayload
} from './types';

export default ((store: InternalStore<ActionStoreState>) => {

    store.write('$add-actions', '$actions-extension', state => {
        state.$actions = {};
    });

    const addActionInstance = store.mutation<AddActionInstancePayload>('$add-action-instance', (state, payload) => {
        const {
            actionName,
            instanceId,
            instancePayload
        } = payload;

        if (!state.$actions[actionName]) {
            state.$actions[actionName] = new Map<symbol, any>();
        }

        state.$actions[actionName].set(instanceId, instancePayload);
    });

    const removeActionInstance = store.mutation<RemoveActionInstancePayload>('$remove-action-instance', (state, payload) => {
        const {
            actionName,
            instanceId,
        } = payload;

        if (!state.$actions[actionName]) {
            return;
        }

        state.$actions[actionName].delete(instanceId);
    });
     
    function action<TPayload, TResult = void>(name: string, body: ActionBody<TPayload, TResult>): Action<TPayload, TResult> {
        const mutate = (mutator: Mutator<ActionStoreState, undefined, void>) => store.write(name, '$actions-extension', mutator);
        
        const _action = async (payload: TPayload) => {
            const id = Symbol(name);
    
            addActionInstance({
                actionName: name,
                instanceId: id,
                instancePayload: payload
            });

            let result: TResult;

            try {
                result = await body(payload);
            } finally {
                removeActionInstance({
                    actionName: name,
                    instanceId: id 
                });
            }

            return result;
        };

        _action.name = name;

        return _action as Action<TPayload, TResult>;
    }

    function isActionRunnng<TPayload = any>(name: string, instancePredicate?: ActionPredicate<TPayload>) {
        const predicate = instancePredicate || (() => true);
        const instances = store.state.$actions[name];

        return !!instances && Array
            .from(instances.values())
            .some(payload => predicate(payload));
    }

    function useAction<TPayload, TResult>(action: Action<TPayload, TResult>): ComposedAction<TPayload, TResult> {
        const isRunning = (predicate?: ActionPredicate<TPayload>) => isActionRunnng(action.name, predicate);

        return [
            action,
            isRunning
        ];
    }

    return {
        action,
        isActionRunnng,
        useAction
    };

});