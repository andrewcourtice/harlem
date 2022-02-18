import {
    SENDER,
    MUTATIONS,
} from './constants';

import {
    clone,
    overwrite,
} from '@harlem/utilities';

import {
    BaseState,
    InternalStore,
} from '@harlem/core';

import type {
    Options,
    Snapshot,
    BranchCallback,
} from './types';

export * from './types';

export default function snapshotExtension<TState extends BaseState>(options?: Partial<Options>) {
    const {
        mutationName,
    } = {
        mutationName: MUTATIONS.snapshot,
        ...options,
    } as Options;

    return (store: InternalStore<TState>) => {
        function apply<TBranchState extends BaseState>(snapshotBranch: TBranchState, branchCallback: BranchCallback<TState, TBranchState>) {
            store.write(mutationName, SENDER, state => {
                const stateBranch = branchCallback(state);
                overwrite(stateBranch, clone(snapshotBranch));
            });
        }

        function snapshot<TBranchState extends BaseState = TState>(branchCallback: BranchCallback<TState, TBranchState> = ((state: TState) => state) as any): Snapshot<TBranchState> {
            const snapshotBranch = branchCallback(store.state);
            const state = Object.freeze(clone(snapshotBranch)) as TBranchState;

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