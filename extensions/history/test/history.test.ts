import historyExtension from '../src';

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

describe('History Extension', () => {

    const getInstance = () => getStore({
        extensions: [
            historyExtension(),
        ],
    });

    let instance: ReturnType<typeof getInstance>;

    beforeAll(() => bootstrap());
    beforeEach(() => {
        instance = getInstance();
    });

    afterEach(() => instance.store.destroy());

    test('Performs an undo/redo operation', () => {
        const {
            store,
            setUserID,
            setUserDetails,
        } = instance;

        const {
            state,
            undo,
            redo,
        } = store;

        setUserID(5);
        setUserDetails({
            firstName: 'John',
        });

        setUserDetails({
            firstName: 'More things',
        });

        expect(state.details.firstName).toBe('More things');
        undo();
        expect(state.details.firstName).toBe('John');
        undo();
        expect(state.details.firstName).toBe('');
        redo();
        expect(state.details.firstName).toBe('John');
        redo();
        expect(state.details.firstName).toBe('More things');
        undo();
        expect(state.details.firstName).toBe('John');

        setUserDetails({
            firstName: 'After',
        });

        expect(state.details.firstName).toBe('After');
        undo();
        expect(state.details.firstName).toBe('John');
        redo();
        expect(state.details.firstName).toBe('After');
    });

});