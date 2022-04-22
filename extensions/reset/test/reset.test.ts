import resetExtension from '../src';

import {
    INTERNAL,
} from '@harlem/core';

import {
    bootstrap,
    getStore,
} from '@harlem/testing';

import {
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    expect,
    test,
} from 'vitest';

describe('Reset Extension', () => {

    const getInstance = () => getStore({
        extensions: [
            resetExtension(),
            store => {
                const key = `${INTERNAL.prefix}test`;
                const value = 'value';

                store.write('$test', 'test', state => state[key] = value);

                return {
                    key,
                    value,
                };
            },
        ],
    });

    let instance = getInstance();

    beforeAll(() => bootstrap());
    beforeEach(() => {
        instance = getInstance();
    });

    afterEach(() => instance.store.destroy());

    test('Performs a root reset', () => {
        const {
            store,
            setUserID,
            setUserDetails,
        } = instance;

        setUserID(5);
        setUserDetails({
            firstName: 'John',
            lastName: 'Smith',
            age: 35,
        });

        expect(store.state.id).toBe(5);
        expect(store.state.details.firstName).toBe('John');
        expect(store.state.details.lastName).toBe('Smith');

        store.reset();

        expect(store.state.id).toBe(0);
        expect(store.state.details.firstName).toBe('');
        expect(store.state.details.lastName).toBe('');
        expect(store.state.details.age).toBe(0);
    });

    test('Performs a partial reset', () => {
        const {
            store,
            setUserID,
            setUserDetails,
        } = instance;

        setUserID(7);
        setUserDetails({
            firstName: 'John',
            lastName: 'Smith',
            age: 35,
        });

        expect(store.state.id).toBe(7);
        expect(store.state.details.firstName).toBe('John');
        expect(store.state.details.lastName).toBe('Smith');
        expect(store.state.details.age).toBe(35);

        store.reset(state => state.details);

        expect(store.state.id).toBe(7);
        expect(store.state.details.firstName).toBe('');
        expect(store.state.details.lastName).toBe('');
        expect(store.state.details.age).toBe(0);
    });

    test('Ignores internal properties', () => {
        const {
            store,
            setUserID,
            setUserDetails,
        } = instance;

        setUserID(7);
        setUserDetails({
            firstName: 'John',
            lastName: 'Smith',
            age: 35,
        });

        expect(store.state.id).toBe(7);
        expect(store.state.details.firstName).toBe('John');
        expect(store.state.details.lastName).toBe('Smith');
        expect(store.state.details.age).toBe(35);

        store.reset();

        expect(store.state[store.key]).toBe(store.value);
        expect(store.state.id).toBe(0);
        expect(store.state.details.firstName).toBe('');
        expect(store.state.details.lastName).toBe('');
        expect(store.state.details.age).toBe(0);
    });

});