import transactionExtension from '../src/index';

import {
    bootstrap,
    getStore,
} from '@harlem/testing';

import {
    beforeAll,
    describe,
    expect,
    test,
} from 'vitest';

describe('Transaction Plugin', () => {

    beforeAll(() => bootstrap());

    test('Rollback a transaction', () => {
        const {
            store,
            setUserID,
            setUserDetails,
        } = getStore({
            extensions: [
                transactionExtension(),
            ],
        });

        const transact = store.transaction('test-transaction', (id: number) => {
            setUserID(id);

            setUserDetails({
                firstName: 'John',
                lastName: 'Smith',
                age: 35,
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