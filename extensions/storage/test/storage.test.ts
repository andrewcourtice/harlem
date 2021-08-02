import {
    bootstrap,
    getStore,
    jsonClone,
} from '@harlem/testing';

import storageExtension from '../src';

describe('Snapshot Extension', () => {

    beforeAll(() => bootstrap());

    test('Write to storage', () => {
        const {
            name,
            store,
            setUserDetails,
        } = getStore({
            extensions: [
                storageExtension(),
            ],
        });

        const key = `harlem:${name}`;
        let value = localStorage.getItem(key);

        expect(value).toBeNull();

        setUserDetails({
            firstName: 'John',
            lastName: 'smith',
            age: 22,
        });

        const expectedValue = JSON.stringify(store.state);

        value = localStorage.getItem(key);

        expect(value).toBe(expectedValue);

        store.destroy();
    });

    test('Sync from storage', () => {
        const {
            name,
            store,
        } = getStore({
            extensions: [
                storageExtension(),
            ],
        });

        const key = `harlem:${name}`;
        const value = jsonClone(store.state);

        Object.assign(value.details, {
            firstName: 'John',
            lastName: 'smith',
            age: 22,
        });

        localStorage.setItem(key, JSON.stringify(value));

        expect(store.state.details.firstName).toBe(value.details.firstName);
        expect(store.state.details.lastName).toBe(value.details.lastName);
        expect(store.state.details.age).toBe(value.details.age);

        store.destroy();
    });

});