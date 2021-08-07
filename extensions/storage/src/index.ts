import {
    SENDER,
} from './constants';

import {
    EVENTS,
    BaseState,
    EventPayload,
    InternalStore,
    MutationEventData,
} from '@harlem/core';

import type {
    Options,
} from './types';

export * from './types';

export default function storageExtension<TState extends BaseState>(options?: Partial<Options<TState>>) {
    const {
        type,
        prefix,
        sync,
        serialiser,
        parser,
    } = {
        type: 'local',
        prefix: 'harlem',
        sync: true,
        serialiser: state => JSON.stringify(state),
        parser: value => JSON.parse(value),
        ...options,
    } as Options<TState>;

    const storage = type === 'session' ? sessionStorage : localStorage;

    return (store: InternalStore<TState>) => {
        const storageKey = prefix ? `${prefix}:${store.name}` : store.name;

        store.on(EVENTS.mutation.success, (event?: EventPayload<MutationEventData>) => {
            if (!event || event.data.mutation === '$storage') {
                return;
            }

            try {
                storage.setItem(storageKey, serialiser(store.state));
            } catch {
                console.warn('Failed to write to storage');
            }
        });

        function listener({ key, storageArea, newValue }: StorageEvent) {
            if (storageArea === storage && key === storageKey && newValue) {
                store.write('$storage', SENDER, state => Object.assign(state, parser(newValue)));
            }
        }

        function startStorageSync() {
            window.addEventListener('storage', listener);
        }

        function stopStorageSync() {
            window.removeEventListener('storage', listener);
        }

        store.once(EVENTS.store.destroyed, () => stopStorageSync());

        if (sync) {
            startStorageSync();
        }

        return {
            startStorageSync,
            stopStorageSync,
        };
    };
}