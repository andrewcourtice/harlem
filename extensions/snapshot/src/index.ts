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

interface MutationPayload<TState extends BaseState, TBranchState extends BaseState> {
    snapshotBranch: TBranchState;
    branchCallback: BranchCallback<TState, TBranchState>;
}

export default function snapshotExtension<TState extends BaseState>(options?: Partial<Options>) {
    const {
        mutationName,
    } = {
        mutationName: '$snapshot',
        ...options,
    } as Options;

    return (store: InternalStore<TState>) => {
        const _apply = store.mutation(mutationName, (state, { snapshotBranch, branchCallback }: MutationPayload<TState, BaseState>) => {
            const stateBranch = branchCallback(state);
            overwrite(stateBranch, clone(snapshotBranch));
        });

        function snapshot<TBranchState extends BaseState = TState>(branchCallback: BranchCallback<TState, TBranchState> = ((state: TState) => state) as any): Snapshot<TBranchState> {
            const snapshotBranch = branchCallback(store.state);
            const state = Object.freeze(clone(snapshotBranch));

            const apply = () => _apply({
                branchCallback,
                snapshotBranch: state,
            });

            return {
                state,
                apply,
            };
        }

        return {
            snapshot,
        };
    };
}