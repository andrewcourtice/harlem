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
    EventListener,
    InternalStore,
} from '@harlem/core';

import {
    fromPath,
    isFunction,
    isNil,
    toPath,
} from '@harlem/utilities';

import type {
    Accessor,
    Getter,
    ListenersAccessor,
    Setter,
} from './types';

export * from './types';

function traceObjectPath<TValue extends object>(onAccess: (key: PropertyKey) => void): TValue {
    return new Proxy({} as TValue, {
        get(target, key) {
            onAccess(key);
            return traceObjectPath(onAccess);
        },
    });
}

function getTraceObject<TValue extends object>() {
    const nodes = new Set<PropertyKey>();
    const value = traceObjectPath<TValue>(key => nodes.add(key));
    const getNodes = () => Array.from(nodes);
    const resetNodes = () => nodes.clear();

    return {
        value,
        getNodes,
        resetNodes,
    };
}

export function useListeners(listeners: ListenersAccessor) {
    const _listeners = ([] as EventListener[])
        .concat(isFunction(listeners)
            ? listeners()
            : listeners
        );

    onUnmounted(() => _listeners.forEach(({ dispose }) => dispose()));
}

export default function composeExtension<TState extends BaseState>() {

    return (store: InternalStore<TState>) => {
        store.register('extensions', 'compose', () => ({}));

        const {
            value,
            getNodes,
            resetNodes,
        } = getTraceObject<TState>();

        function useState<TValue>(accessor: Accessor<TState, TValue>, mutationName?: string): [Getter<TValue>, Setter<TValue>] {
            accessor(value);

            const nodes = getNodes();
            const name = mutationName || `extension:compose:${toPath(['root', ...nodes])}`;
            const key = nodes.pop();
            const parent = (state: object) => fromPath(state, nodes) as Record<PropertyKey, unknown>;

            resetNodes();

            if (isNil(key)) {
                throw new Error('A valid property must be used');
            }

            const getter = () => parent(store.state)[key] as DeepReadonly<TValue>;
            const setter = (value => store.write(name, SENDER, state => {
                parent(state)[key] = isFunction(value)
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