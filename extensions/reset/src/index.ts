
import {
    clone,
    overwrite,
} from '@harlem/utilities';

import type {
    InternalStore,
    BaseState,
} from '@harlem/core';

import type {
    BranchCallback,
} from './types';

export default function resetExtension<TState extends BaseState>() {
    return (store: InternalStore<TState>) => {
        const snapshot = clone(store.state) as TState;

        const reset = store.mutation('$reset', (state, branchCallback: BranchCallback<TState>) => {
            const branchProducer = branchCallback || (state => state);
            const snapshotClone = clone(snapshot);
            const stateBranch = branchProducer(state);
            const snapshotBranch = branchProducer(snapshotClone);

            overwrite(stateBranch, snapshotBranch);
        });

        return {
            reset,
        };
    };
}