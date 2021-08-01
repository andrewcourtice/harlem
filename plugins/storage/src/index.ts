import {
    OPTIONS,
    SENDER,
    STORAGE,
} from './constants';

import type {
    EventPayload,
    HarlemPlugin,
    MutationEventData,
} from '@harlem/core';

import type {
    Options,
} from './types';

export * from './types';

export default function createStoragePlugin(stores: string | string[], options: Partial<Options> = OPTIONS): HarlemPlugin {
    const {
        type,
        prefix,
        sync,
    } = {
        ...OPTIONS,
        ...options,
    };

    const storage = STORAGE[type] || STORAGE.local;

    const getKey = (name: string) => {
        return prefix ? `${prefix}:${name}` : name;
    };

    const canStore = (name: string): boolean => {
        return stores === '*' || ([] as string[]).concat(stores).includes(name);
    };

    return {

        name: 'storage',

        install(app, eventEmitter, internalStores) {
            const mutationHook = (payload?: EventPayload<MutationEventData>) => {
                if (!payload || payload.sender === SENDER || !canStore(payload.store)) {
                    return;
                }

                const store = internalStores.get(payload.store);

                if (!store) {
                    return;
                }

                const key = getKey(payload.store);
                const state = store.state;

                storage.setItem(key, JSON.stringify(state));
            };

            eventEmitter.on('mutation:after', mutationHook);

            if (!sync) {
                return;
            }

            window.addEventListener('storage', event => {
                if (event.storageArea !== storage) {
                    return;
                }

                const value = event.newValue;
                const entry = Array.from(internalStores)
                    .find(([key, value]) => {
                        return canStore(key) && event.key === getKey(key);
                    });

                if (!entry || !value) {
                    return;
                }

                const [
                    name,
                    store,
                ] = entry;

                store.write('plugin:storage:sync', SENDER, state => {
                    Object.assign(state, JSON.parse(value));
                });
            });
        },

    };

}