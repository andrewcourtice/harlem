import type {
    HarlemPlugin
} from '@harlem/core';

import type {
    Options,
    StorageMap
} from './types';

const OPTIONS: Options = {
    type: 'local',
    prefix: 'harlem'
};

const STORAGE: StorageMap = {
    local: localStorage,
    session: sessionStorage
};

export default function(options: Options = OPTIONS): HarlemPlugin {
    const {
        type,
        prefix
    } = {
        ...OPTIONS,
        ...options
    };

    const storage = STORAGE[type] || STORAGE.local;

    return {

        name: 'storage',

        install(app, eventEmitter, stores) {
            const storageHook = (storeName: string) => {
                const store = stores.get(storeName);
        
                if (!store) {
                    return;
                }
        
                const state = store.state();
                const key = prefix ? `${prefix}:${storeName}` : storeName;
        
                storage.setItem(key, JSON.stringify(state));
            };

            eventEmitter.on('mutation', storageHook);
        }

    };

};