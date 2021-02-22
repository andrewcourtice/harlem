import {
    EVENTS,
    SENDER
} from './constants';

import {
    clone,
    overwrite
} from '@harlem/utilities';

import type {
    Emittable,
    EventPayload,
    HarlemPlugin,
    InternalStores
} from '@harlem/core';

import type {
    Transactor,
    Transaction,
    TransactionEventData,
    TransactionRollback
} from './types';

export * from './types';

let eventEmitter: Emittable;
let stores: InternalStores;

export function transaction<T>(name: string, transactor: Transactor<T>): Transaction<T> {
    return payload => {
        if (!eventEmitter || !stores) {
            throw new Error('Please ensure the transaction plugin is registered before creating a transaction');
        }

        const rollbacks = new Map<string, TransactionRollback>();

        const eventPayload: EventPayload<TransactionEventData> = {
            store: '$all',
            sender: SENDER,
            data: {
                payload,
                transaction: name
            }
        }

        const listener = eventEmitter.on('mutation:before', payload => {
            if (!payload || rollbacks.has(payload.store)) {
                return;
            }

            const store = stores.get(payload.store);
            
            if (store) {
                const snapshot = clone(store.state);

                rollbacks.set(store.name, () => {
                    store.write('plugin:transaction:rollback', SENDER, state => overwrite(state, snapshot));
                });
            }
        });

        eventEmitter.emit(EVENTS.transaction.before, eventPayload);
        
        try {
            transactor(payload);
        } catch (error) {
            rollbacks.forEach(rollback => rollback());
            eventEmitter.emit(EVENTS.transaction.error, eventPayload);

            throw error;
        } finally {
            listener.dispose();
        }
        
        eventEmitter.emit(EVENTS.transaction.after, eventPayload);
    }
}

export default function createTransactionPlugin(): HarlemPlugin {

    return {
        name: 'transaction',

        install(app, _eventEmitter, _stores) {
            eventEmitter = _eventEmitter;
            stores = _stores;
        }
    };

}