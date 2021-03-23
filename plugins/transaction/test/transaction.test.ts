import {
    store,
    bootstrap
} from '@harlem/testing';

import createTransactionPlugin, {
    transaction
} from '../src/index';

describe('Transaction Plugin', () => {

    beforeAll(() => bootstrap([
        createTransactionPlugin()
    ]));

    beforeEach(() => store.reset());

    test('Run a transaction', () => {
        const transact = transaction<number>('test-transaction', id => {
            store.setUserID(id);

            store.setUserDetails({
                firstName: 'John',
                lastName: 'Smith',
                age: 35
            });
            
            throw new Error();
        });

        try {
            transact(5);
        } catch {
            // do nothing
        }

        expect(store.state.id).toBe(0);
        expect(store.state.details.firstName).toBe('');
        expect(store.state.details.lastName).toBe('');
        expect(store.state.details.age).toBe(0);
    });

});