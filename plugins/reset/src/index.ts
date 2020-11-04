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
    InternalStores
} from '@harlem/core';

const snapshots = new Map<string, any>();

let eventEmitter: Emittable;
let stores: InternalStores;

export function reset(name: string): void {
    if (!eventEmitter || !stores) {
        throw new Error('Please ensure the reset plugin is registered before resetting a store');
    }

    const snapshot = snapshots.get(name);
    const store = stores.get(name);

    if (!(store && snapshot)) {
        throw new Error('Failed to reset store. Store does not exists or has an invalid snapshot.');
    }

    store.exec('$reset', SENDER, state => overwrite(state, clone(snapshot)));
}

export default function createResetPlugin(): HarlemPlugin {

    return {
        name: 'reset',

        install(app, _eventEmitter, _stores) {
            eventEmitter = _eventEmitter;
            stores = _stores;

            eventEmitter.on('store:created', payload => {
                if (!payload) {
                    return;
                }

                snapshots.set(payload.store, clone(payload.data));
            });
        }
    };

}