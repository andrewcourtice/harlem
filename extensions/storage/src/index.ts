import {
    MUTATIONS,
    SENDER,
} from './constants';

import {
    BaseState,
    EventPayload,
    EVENTS,
    INTERNAL,
    InternalStore,
    MutationEventData,
    ReadState,
} from '@harlem/core';

import {
    functionIdentity,
    matchGetFilter,
    objectFromPath,
    objectOmit,
    objectSet,
    objectTrace,
    typeIsNil,
} from '@harlem/utilities';

import type {
    Options,
} from './types';

export * from './types';

function getOptions<TState extends BaseState>(options?: Partial<Options<TState>>): Options<TState> {
    return {
        type: 'local',
        prefix: 'harlem',
        sync: true,
        restore: false,
        include: '*',
        exclude: [],
        serialiser: state => JSON.stringify(state),
        parser: value => JSON.parse(value),
        branch: functionIdentity,
        ...options,
    };
}

export default function storageExtension<TState extends BaseState>(options?: Partial<Options<TState>>) {
    const _options = getOptions(options);
    const {
        type,
        prefix,
        sync,
        restore,
        include,
        exclude,
        serialiser,
        parser,
        branch,
    } = _options;

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

        store.register('extensions', 'storage', () => _options);

        const {
            value,
            getNodes,
            resetNodes,
        } = objectTrace<ReadState<TState>>();

        const storage = type === 'session' ? sessionStorage : localStorage;
        const storageKey = prefix ? `${prefix}:${store.name}` : store.name;
        const mutationFilter = matchGetFilter({
            include,
            exclude,
        });

        resetNodes();
        branch(value);

        function startStorageWrite() {
            store.on(EVENTS.mutation.success, (event?: EventPayload<MutationEventData>) => {
                if (!event || event.data.mutation === MUTATIONS.sync || mutationFilter(event.data.mutation)) {
                    return;
                }

                try {
                    const state = objectOmit(store.state, INTERNAL.pattern);
                    const subState = objectFromPath(state, getNodes());

                    storage.setItem(storageKey, serialiser(subState as typeof state));
                } catch {
                    console.warn('Failed to write to storage');
                }
            });
        }

        function syncStorage(value: string) {
            store.write(MUTATIONS.sync, SENDER, state => {
                objectSet(state, getNodes(), parser(value), INTERNAL.pattern);
            });
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

            if (!typeIsNil(value)) {
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
