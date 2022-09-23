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
    EVENTS,
    INTERNAL,
    InternalStore,
} from '@harlem/core';

import type {
    BranchCallback,
} from './types';

export * from './types';

/**
 * @deprecated The reset extension is now deprecated. Reset functionaility is now part of the core store.
 */
export default function resetExtension<TState extends BaseState>() {
    return (store: InternalStore<TState>) => {
        store.register('extensions', 'reset', () => 'No options specified');

        let snapshot: TState | undefined;

        function reset<TBranchState extends BaseState>(branchCallback: BranchCallback<TState, TBranchState> = state => state as TBranchState) {
            store.write(MUTATIONS.reset, SENDER, state => {
                if (!snapshot) {
                    return;
                }

                const source = branchCallback(snapshot);
                const target = branchCallback(state);

                objectOverwrite(target, objectClone(source), INTERNAL.pattern);
            });
        }

        store.on(EVENTS.store.created, () => snapshot = objectClone(store.state) as TState);
        store.on(EVENTS.devtools.reset, () => reset());

        return {
            reset,
        };
    };
}