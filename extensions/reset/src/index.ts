import {
    SENDER,
} from './constants';

import {
    clone,
    overwrite,
} from '@harlem/utilities';

import {
    INTERNAL,
    InternalStore,
    BaseState,
} from '@harlem/core';

import type {
    BranchCallback,
} from './types';

export * from './types';

export default function resetExtension<TState extends BaseState>() {
    return (store: InternalStore<TState>) => {
        const snapshot = clone(store.state) as TState;

        function reset<TBranchState extends BaseState>(branchCallback: BranchCallback<TState, TBranchState> = state => state as TBranchState) {
            store.write('$reset', SENDER, state => {
                const source = branchCallback(snapshot);
                const target = branchCallback(state);

                overwrite(target, clone(source), INTERNAL.pattern);
            });
        }

        return {
            reset,
        };
    };
}