import {
    SENDER,
} from './constants';

import {
    computed,
    DeepReadonly,
    onUnmounted,
} from 'vue';

import {
    BaseState,
    InternalStore,
} from '@harlem/core';

import {
    Disposable,
    objectFromPath,
    objectToPath,
    objectTrace,
    typeIsFunction,
    typeIsNil,
} from '@harlem/utilities';

import type {
    Accessor,
    Getter,
    ListenersAccessor,
    Setter,
} from './types';

export * from './types';

export function useListeners(listeners: ListenersAccessor) {
    const _listeners = ([] as Disposable[])
        .concat(typeIsFunction(listeners)
            ? listeners()
            : listeners
        );

    onUnmounted(() => _listeners.forEach(({ dispose }) => dispose()));
}

export default function composeExtension<TState extends BaseState>() {

    return (store: InternalStore<TState>) => {
        store.register('extensions', 'compose', () => 'No options specified');

        const {
            value,
            getNodes,
            resetNodes,
        } = objectTrace<TState>();

        function useState<TValue>(accessor: Accessor<TState, TValue>, mutationName?: string): [Getter<TValue>, Setter<TValue>] {
            accessor(value);

            const nodes = getNodes();
            const name = mutationName || `extension:compose:${objectToPath(['root', ...nodes])}`;
            const key = nodes.pop();
            const parent = (state: object) => objectFromPath(state, nodes) as Record<PropertyKey, unknown>;

            resetNodes();

            if (typeIsNil(key)) {
                throw new Error('A valid property must be used');
            }

            const getter = () => parent(store.state)[key] as DeepReadonly<TValue>;
            const setter = (value => store.write(name, SENDER, state => {
                parent(state)[key] = typeIsFunction(value)
                    ? value(getter())
                    : value;
            })) as Setter<TValue>;

            return [
                getter,
                setter,
            ];
        }

        function computeState<TValue>(accessor: Accessor<TState, TValue>, mutationName?: string) {
            const [
                getter,
                setter,
            ] = useState(accessor, mutationName);

            return computed({
                get: () => getter() as TValue,
                set: value => setter(value),
            });
        }

        return {
            useState,
            computeState,
            useListeners,
        };
    };
}