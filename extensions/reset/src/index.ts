import snapshotExtension from '@harlem/extension-snapshot';

import type {
    InternalStore,
    BaseState,
} from '@harlem/core';

export default function resetExtension<TState extends BaseState>() {
    const createSnapshotExtension = snapshotExtension<TState>({
        mutationName: '$reset',
    });

    return (store: InternalStore<TState>) => {
        const {
            snapshot,
        } = createSnapshotExtension(store);

        const snap = snapshot();

        return {
            reset: () => snap.apply(),
        };
    };
}