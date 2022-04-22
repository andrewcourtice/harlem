import snapshotExtension from '../src';

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

describe('Snapshot Extension', () => {

    const getInstance = () => getStore({
        extensions: [
            snapshotExtension(),
        ],
    });

    let instance = getInstance();

    beforeAll(() => bootstrap());
    beforeEach(() => {
        instance = getInstance();
    });

    afterEach(() => instance.store.destroy());

    test('Apply a snapshot', () => {
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


        const snapshot = store.snapshot();

        setUserID(7);
        setUserDetails({
            firstName: 'Jane',
            lastName: 'Doe',
            age: 25,
        });

        expect(store.state.id).toBe(7);
        expect(store.state.details.firstName).toBe('Jane');
        expect(store.state.details.lastName).toBe('Doe');
        expect(store.state.details.age).toBe(25);

        snapshot.apply();

        expect(store.state.id).toBe(5);
        expect(store.state.details.firstName).toBe('John');
        expect(store.state.details.lastName).toBe('Smith');
        expect(store.state.details.age).toBe(35);
    });

    test('Apply a branch snapshot', () => {
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


        const snapshot = store.snapshot(state => state.details);

        setUserID(7);
        setUserDetails({
            firstName: 'Jane',
            lastName: 'Doe',
            age: 25,
        });

        expect(store.state.id).toBe(7);
        expect(store.state.details.firstName).toBe('Jane');
        expect(store.state.details.lastName).toBe('Doe');
        expect(store.state.details.age).toBe(25);

        snapshot.apply();

        expect(store.state.id).toBe(7);
        expect(store.state.details.firstName).toBe('John');
        expect(store.state.details.lastName).toBe('Smith');
        expect(store.state.details.age).toBe(35);
    });

});