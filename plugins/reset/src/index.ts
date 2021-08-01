import {
    SENDER,
} from './constants';

import {
    clone,
    overwrite,
} from '@harlem/utilities';

import type {
    Emittable,
    HarlemPlugin,
    InternalStores,
    WriteState,
} from '@harlem/core';

const snapshots = new Map<string, any>();

let eventEmitter: Emittable;
let stores: InternalStores;

export function reset<TState extends object = any, TBranch extends object = TState>(name: string, branchCallback?: (state: WriteState<TState>) => TBranch): void {
    if (!eventEmitter || !stores) {
        throw new Error('Please ensure the reset plugin is registered before resetting a store');
    }

    const snapshot = snapshots.get(name);
    const store = stores.get(name);

    if (!(store && snapshot)) {
        throw new Error('Failed to reset store. Store does not exists or has an invalid snapshot.');
    }

    store.write('plugin:reset:reset', SENDER, state => {
        const branchProducer = branchCallback || (state => state);
        const snapshotClone = clone(snapshot);
        const stateBranch = branchProducer(state);
        const snapshotBranch = branchProducer(snapshotClone);

        overwrite(stateBranch, snapshotBranch);
    });
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
        },
    };

}