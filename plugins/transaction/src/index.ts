import cloneDeep from 'lodash/cloneDeep';

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

let _eventEmitter: Emittable;
let _stores: InternalStores;

export function transaction<T>(name: string, transactor: Transactor<T>): Transaction<T> {
    return payload => {
        if (!_eventEmitter || !_stores) {
            throw new Error('Please ensure the transaction plugin is registered before creating a transaction');
        }

        const rollbacks = new Map<string, TransactionRollback>();

        const eventPayload: EventPayload<TransactionEventData> = {
            store: '$all',
            sender: 'transaction',
            data: {
                payload,
                transaction: name
            }
        }

        const listener = _eventEmitter.on('mutation:before', payload => {
            if (rollbacks.has(payload.store)) {
                return;
            }

            const store = _stores.get(payload.store);
            
            if (store) {
                const snapshot = cloneDeep(store.state);

                rollbacks.set(store.name, () => {
                    store.exec('$transactionRollback', 'transaction', state => Object.assign(state, snapshot));
                });
            }
        });

        _eventEmitter.emit('transaction:before', eventPayload);
        
        try {
            transactor(payload);
        } catch (error) {
            rollbacks.forEach(rollback => rollback());
            _eventEmitter.emit('transaction:error', eventPayload);

            //throw error;
        } finally {
            listener.dispose();
        }
        
        _eventEmitter.emit('transaction:after', eventPayload);
    }
}

export default function(): HarlemPlugin {

    return {
        name: 'transaction',

        install(app, eventEmitter, stores) {
            _eventEmitter = eventEmitter;
            _stores = stores;
        }
    };

}