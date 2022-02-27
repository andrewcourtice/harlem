import composeExtension from '../src';

import {
    bootstrap,
    getStore,
} from '@harlem/testing';

import {
    describe,
    test,
    expect,
    beforeAll,
} from 'vitest';

describe('Compose Extension', () => {

    beforeAll(() => bootstrap());

    test('Use state with simple value', () => {
        const {
            store,
        } = getStore({
            extensions: [
                composeExtension(),
            ],
        });

        const {
            useState,
        } = store;

        const [
            getFirstName,
            setFirstName,
        ] = useState(state => state.details.firstName);

        expect(getFirstName()).toBe('');
        setFirstName('John');
        expect(getFirstName()).toBe('John');
        setFirstName((name) => `${name} Doe`);
        expect(getFirstName()).toBe('John Doe');
    });

    test('Use state with complex value', () => {
        const {
            store,
        } = getStore({
            extensions: [
                composeExtension(),
            ],
        });

        const {
            useState,
        } = store;

        const [
            getDetails,
            setDetails,
        ] = useState(state => state.details);

        let details = getDetails();

        expect(details.age).toBe(0);

        setDetails({
            firstName: 'Bill',
            lastName: 'Smith',
            age: 45,
        });

        details = getDetails();

        expect(details.age).toBe(45);
    });

    test('Compute state', () => {
        const {
            store,
        } = getStore({
            extensions: [
                composeExtension(),
            ],
        });

        const {
            state,
            computeState,
        } = store;

        const firstName = computeState(state => state.details.firstName);

        firstName.value = 'John';

        expect(state.details.firstName).toBe('John');
    });

});