import {
    MUTATIONS,
    SENDER,
} from './constants';

import {
    objectClone,
    objectOverwrite,
} from '@harlem/utilities';

import {
    BaseState,
    InternalStore,
} from '@harlem/core';

import type {
    BranchCallback,
    Options,
    Snapshot,
} from './types';

export * from './types';

function getOptions(options?: Partial<Options>): Options {
    return {
        mutationName: MUTATIONS.snapshot,
        ...options,
    };
}

/**
 * @deprecated The snapshot extension is now deprecated. Snapshot functionaility is now part of the core store.
 */
export default function snapshotExtension<TState extends BaseState>(options?: Partial<Options>) {
    const _options = getOptions(options);

    return (store: InternalStore<TState>) => {
        store.register('extensions', 'snapshot', () => options);

        function apply<TBranchState extends BaseState>(snapshotBranch: TBranchState, branchCallback: BranchCallback<TState, TBranchState>) {
            store.write(_options.mutationName, SENDER, state => {
                const stateBranch = branchCallback(state);
                objectOverwrite(stateBranch, objectClone(snapshotBranch));
            });
        }

        function snapshot<TBranchState extends BaseState = TState>(branchCallback: BranchCallback<TState, TBranchState> = (state: TState) => state): Snapshot<TBranchState> {
            const snapshotBranch = branchCallback(store.state);
            const state = Object.freeze(objectClone(snapshotBranch)) as TBranchState;

            return {
                state,
                apply: () => apply(state, branchCallback),
            };
        }

        return {
            snapshot,
        };
    };
}