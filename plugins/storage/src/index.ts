import type {
    EventPayload,
    HarlemPlugin,
    MutationEventData
} from '@harlem/core';

import type {
    Options,
    StorageMap
} from './types';

const OPTIONS: Options = {
    type: 'local',
    prefix: 'harlem',
    sync: true
};

const STORAGE: StorageMap = {
    local: localStorage,
    session: sessionStorage
};

export default function(options: Options = OPTIONS): HarlemPlugin {
    const {
        type,
        prefix,
        sync
    } = {
        ...OPTIONS,
        ...options
    };

    const storage = STORAGE[type] || STORAGE.local;

    return {

        name: 'storage',

        install(app, eventEmitter, stores) {
            const storageHook = ({ sender, store: storeName }: EventPayload<MutationEventData>) => {
                if (sender === 'storage') {
                    return;
                }
                
                const store = stores.get(storeName);
        
                if (!store) {
                    return;
                }
        
                const state = store.state();
                const key = prefix ? `${prefix}:${storeName}` : storeName;
        
                storage.setItem(key, JSON.stringify(state));
            };

            eventEmitter.on('mutation', storageHook);

            if (!sync) {
                return;
            }

            window.addEventListener('storage' event => {
                if (event.storageArea !== storage) {
                    return;
                }

                const keys = Array.from(stores.keys())
                    .map()
            });
        }

    };

};