import {
    store,
    bootstrap,
} from '@harlem/testing';

import createResetPlugin, {
    reset,
} from '../src/index';

describe('Reset Plugin', () => {

    beforeAll(() => bootstrap([
        createResetPlugin(),
    ]));

    beforeEach(() => store.reset());

    test('Performs a root reset', () => {
        store.setUserID(5);
        store.setUserDetails({
            firstName: 'John',
            lastName: 'Smith',
        });

        expect(store.state.id).toBe(5);
        expect(store.state.details.firstName).toBe('John');
        expect(store.state.details.lastName).toBe('Smith');

        reset(store.name);
        expect(store.state.id).toBe(0);
        expect(store.state.details.firstName).toBe('');
        expect(store.state.details.lastName).toBe('');
    });

    test('Performs a partial reset', () => {
        store.setUserID(7);
        store.setUserDetails({
            firstName: 'John',
            lastName: 'Smith',
            age: 35,
        });

        expect(store.state.id).toBe(7);
        expect(store.state.details.firstName).toBe('John');
        expect(store.state.details.lastName).toBe('Smith');
        expect(store.state.details.age).toBe(35);

        reset(store.name, (state: store.State) => state.details);
        expect(store.state.id).toBe(7);
        expect(store.state.details.firstName).toBe('');
        expect(store.state.details.lastName).toBe('');
        expect(store.state.details.age).toBe(0);
    });

});