import {
    clone,
    overwrite,
} from '@harlem/utilities';

import type {
    BaseState,
    InternalStore,
} from '@harlem/core';

import type {
    Snapshot,
} from './types';

export default function snapshotExtension<TState extends BaseState>() {
    return (store: InternalStore<TState>) => {
        const apply = store.mutation('$snapshot', (state, data: TState) => overwrite(state, data));

        function snapshot(): Snapshot<TState> {
            const state = Object.freeze(clone(store.state) as TState);

            return {
                state,
                apply: () => apply(state),
            };
        }

        return {
            snapshot,
        };
    };
}