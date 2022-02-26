import {
    SENDER,
    MUTATIONS,
} from './constants';

import {
    EVENTS,
    INTERNAL,
    BaseState,
    EventPayload,
    InternalStore,
    MutationEventData,
} from '@harlem/core';

import {
    omit,
    isNil,
} from '@harlem/utilities';

import type {
    Options,
} from './types';

export * from './types';

export default function storageExtension<TState extends BaseState>(options?: Partial<Options<TState>>) {
    const {
        type,
        prefix,
        sync,
        restore,
        exclude,
        serialiser,
        parser,
    } = {
        type: 'local',
        prefix: 'harlem',
        sync: true,
        restore: false,
        exclude: [],
        serialiser: state => JSON.stringify(state),
        parser: value => JSON.parse(value),
        ...options,
    } as Options<TState>;

    return (store: InternalStore<TState>) => {
        if (store.getFlag('ssr:server')) {
            const noop = () => {};

            return {
                startStorageSync: noop,
                stopStorageSync: noop,
                clearStorage: noop,
                restoreStorage: noop,
            };
        }

        store.register('extensions', 'storage', () => options);

        const storage = type === 'session' ? sessionStorage : localStorage;
        const storageKey = prefix ? `${prefix}:${store.name}` : store.name;

        function startStorageWrite() {
            store.on(EVENTS.mutation.success, (event?: EventPayload<MutationEventData>) => {
                if (!event || event.data.mutation === MUTATIONS.sync || exclude.includes(event.data.mutation)) {
                    return;
                }

                try {
                    const state = omit(store.state, INTERNAL.pattern);
                    storage.setItem(storageKey, serialiser(state));
                } catch {
                    console.warn('Failed to write to storage');
                }
            });
        }

        function syncStorage(value: string) {
            store.write(MUTATIONS.sync, SENDER, state => Object.assign(state, parser(value)));
        }

        function listener({ key, storageArea, newValue }: StorageEvent) {
            if (storageArea === storage && key === storageKey && newValue) {
                syncStorage(newValue);
            }
        }

        function startStorageSync() {
            window.addEventListener('storage', listener);
        }

        function stopStorageSync() {
            window.removeEventListener('storage', listener);
        }

        function clearStorage() {
            storage.removeItem(storageKey);
        }

        function restoreStorage() {
            const value = storage.getItem(storageKey);

            if (!isNil(value)) {
                syncStorage(value);
            }
        }

        store.once(EVENTS.store.created, () => {
            startStorageWrite();

            if (sync) {
                startStorageSync();
            }

            if (restore) {
                restoreStorage();
            }
        });

        store.once(EVENTS.store.destroyed, () => stopStorageSync());

        return {
            startStorageSync,
            stopStorageSync,
            clearStorage,
            restoreStorage,
        };
    };
}
