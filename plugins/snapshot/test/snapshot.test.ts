import {
    store,
    bootstrap,
} from '@harlem/testing';

import createSnapshotPlugin, {
    snapshot,
} from '../src/index';

describe('Snapshot Plugin', () => {

    beforeAll(() => bootstrap([
        createSnapshotPlugin(),
    ]));

    beforeEach(() => store.reset());

    test('Apply a snapshot', () => {
        store.setUserID(5);
        store.setUserDetails({
            firstName: 'John',
            lastName: 'Smith',
            age: 35,
        });


        const snap = snapshot(store.name);

        store.setUserID(7);
        store.setUserDetails({
            firstName: 'Jane',
            lastName: 'Doe',
            age: 25,
        });

        expect(store.state.id).toBe(7);
        expect(store.state.details.firstName).toBe('Jane');
        expect(store.state.details.lastName).toBe('Doe');
        expect(store.state.details.age).toBe(25);

        snap.apply();

        expect(store.state.id).toBe(5);
        expect(store.state.details.firstName).toBe('John');
        expect(store.state.details.lastName).toBe('Smith');
        expect(store.state.details.age).toBe(35);
    });

});