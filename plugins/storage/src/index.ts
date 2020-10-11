import type {
    EventPayload,
    HarlemPlugin,
    MutationEventData
} from '@harlem/core';

import type {
    Options,
    StorageMap
} from './types';

export * from './types';

const NAME = 'storage';

const OPTIONS: Options = {
    type: 'local',
    prefix: 'harlem',
    sync: true
};

const STORAGE: StorageMap = {
    local: localStorage,
    session: sessionStorage
};

export default function(stores: string | string[], options: Partial<Options> = OPTIONS): HarlemPlugin {
    const {
        type,
        prefix,
        sync
    } = {
        ...OPTIONS,
        ...options
    };

    const storage = STORAGE[type] || STORAGE.local;

    const getKey = (name: string) => {
        return prefix ? `${prefix}:${name}` : name;
    };

    const canStore = (name: string): boolean => {
        return stores === '*' || ([] as string[]).concat(stores).includes(name);
    };

    return {

        name: NAME,

        install(app, eventEmitter, internalStores) {
            const mutationHook = ({ sender, store: storeName }: EventPayload<MutationEventData>) => {
                if (sender === NAME || !canStore(storeName)) {
                    return;
                }
                
                const store = internalStores.get(storeName);
        
                if (!store) {
                    return;
                }
        
                const key = getKey(storeName);
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
                        return canStore(key) && event.key === getKey(key)
                    });
                    
                if (!entry || !value) {
                    return;
                }

                const [
                    name,
                    store
                ] = entry;

                store.exec('$storageSync', NAME, state => {
                    Object.assign(state, JSON.parse(value));
                });
            });
        }

    };

};