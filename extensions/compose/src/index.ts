import {
    SENDER,
} from './constants';

import {
    computed, DeepReadonly,
} from 'vue';

import {
    BaseState,
    InternalStore,
} from '@harlem/core';

import {
    fromPath,
} from '@harlem/utilities';

import type {
    Accessor,
    Getter,
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

export default function composeExtension<TState extends BaseState>() {

    return (store: InternalStore<TState>) => {
        const {
            value,
            getNodes,
            resetNodes,
        } = getTraceObject<TState>();

        function useState<TValue>(accessor: Accessor<TState, TValue>, mutationName?: string): [Getter<TValue>, Setter<TValue>] {
            accessor(value);

            const nodes = getNodes();
            const key = nodes.pop();
            const name = mutationName || `compose:${String(key)}`;
            const parent = (state: object) => fromPath(state, nodes) as Record<PropertyKey, unknown>;

            resetNodes();

            if (!key) {
                throw new Error('A valid property must be used');
            }

            const getter = () => parent(store.state)[key] as DeepReadonly<TValue>;
            const setter = (value: TValue) => store.write(name, SENDER, state => {
                parent(state)[key] = value;
            });

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
        };
    };
}