import {
    SENDER,
    EVENTS,
} from './constants';

import {
    clone,
    overwrite,
} from '@harlem/utilities';

import {
    BaseState,
    InternalStore,
    ReadState,
} from '@harlem/core';

import type {
    Transactor,
    Transaction,
    TransactionEventData,
} from './types';

export * from './types';

export default function transactionExtension<TState extends BaseState>() {
    return (store: InternalStore<TState>) => {
        function rollback(snapshot: ReadState<TState>) {
            store.write('$transaction-rollback', SENDER, state => overwrite(state, snapshot));
        }

        function transaction<TPayload>(name: string, transactor: Transactor<TPayload>): Transaction<TPayload> {
            return payload => {
                const snapshot = clone(store.state) as ReadState<TState>;

                const eventData = {
                    payload,
                    transaction: name,
                } as TransactionEventData;

                store.emit(EVENTS.transaction.before, SENDER, eventData);

                try {
                    transactor(payload!);
                } catch (error) {
                    rollback(snapshot);
                    store.emit(EVENTS.transaction.error, SENDER, eventData);

                    throw error;
                }

                store.emit(EVENTS.transaction.after, SENDER, eventData);
            };
        }

        return {
            transaction,
        };
    };
}