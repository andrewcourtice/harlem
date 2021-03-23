import {
    SENDER
} from './constants';

import {
    clone,
    overwrite
} from '@harlem/utilities';

import type {
    Emittable,
    HarlemPlugin,
    InternalStore,
    InternalStores
} from '@harlem/core';

import type {
    Snapshot
} from './types'; 

let eventEmitter: Emittable;
let stores: InternalStores;

function getStore(name: string): InternalStore {
    const store = stores.get(name);

    if (!store) {
        throw new Error('The referenced store does not exist');
    }

    return store;
}

export function snapshot(name: string): Snapshot {
    if (!eventEmitter || !stores) {
        throw new Error('Please ensure the reset plugin is registered before resetting a store');
    }

    const store = getStore(name);
    const snap = clone(store.state);

    const apply = (replace: boolean = true) => store.write('plugin:snapshot:apply', SENDER, state => {
        const copy = clone(snap);

        if (replace) {
            overwrite(state, copy);
        } else {
            Object.assign(state, copy);
        }
    });

    return {
        apply
    };
}

export default function createSnapshotPlugin(): HarlemPlugin {

    return {
        name: 'snapshot',

        install(app, _eventEmitter, _stores) {
            eventEmitter = _eventEmitter;
            stores = _stores;
        }
    };

}