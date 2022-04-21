import {
    SENDER,
    MUTATIONS,
} from './constants';

import {
    clone,
    overwrite,
} from '@harlem/utilities';

import {
    INTERNAL,
    InternalStore,
    BaseState,
    EVENTS,
} from '@harlem/core';

import type {
    BranchCallback,
} from './types';

export * from './types';

export default function resetExtension<TState extends BaseState>() {
    return (store: InternalStore<TState>) => {
        store.register('extensions', 'reset', () => ({}));

        let snapshot: TState | undefined;

        function reset<TBranchState extends BaseState>(branchCallback: BranchCallback<TState, TBranchState> = state => state as TBranchState) {
            store.write(MUTATIONS.reset, SENDER, state => {
                if (!snapshot) {
                    return;
                }

                const source = branchCallback(snapshot);
                const target = branchCallback(state);

                overwrite(target, clone(source), INTERNAL.pattern);
            });
        }

        store.on(EVENTS.store.created, () => snapshot = clone(store.state) as TState);
        store.on(EVENTS.devtools.reset, () => reset());

        return {
            reset,
        };
    };
}