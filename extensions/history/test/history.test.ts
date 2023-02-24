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
    vi,
} from 'vitest';

describe('History Extension', () => {

    const getInstance = () => getStore({
        extensions: [
            historyExtension({
                mutations: {
                    groups: {
                        default: ['set-user-id'],
                        userDetails: ['set-user-details'],
                    },
                },
            }),
        ],
    });

    let instance: ReturnType<typeof getInstance>;

    beforeAll(() => bootstrap());
    beforeEach(() => {
        instance = getInstance();
    });

    afterEach(() => instance.store.destroy());

    test('Performs a basic undo/redo operation', () => {
        const {
            store,
            setUserID,
        } = instance;

        const {
            state,
            undo,
            redo,
        } = store;

        setUserID(5);
        expect(state.id).toBe(5);
        setUserID(10);
        expect(state.id).toBe(10);
        undo();
        expect(state.id).toBe(5);
        redo();
        expect(state.id).toBe(10);
    });

    test('Performs a grouped undo/redo operation', () => {
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
        undo('userDetails');
        expect(state.details.firstName).toBe('John');
        undo('userDetails');
        expect(state.details.firstName).toBe('');
        redo('userDetails');
        expect(state.details.firstName).toBe('John');
        redo('userDetails');
        expect(state.details.firstName).toBe('More things');
        undo('userDetails');
        expect(state.details.firstName).toBe('John');

        setUserDetails({
            firstName: 'After',
        });

        expect(state.details.firstName).toBe('After');
        undo('userDetails');
        expect(state.details.firstName).toBe('John');
        redo('userDetails');
        expect(state.details.firstName).toBe('After');
    });

    test('Indicates whether an undo/redo operation can be performed', () => {
        const {
            store,
            setUserID,
        } = instance;

        const {
            undo,
            redo,
            canUndo,
            canRedo,
        } = store;

        expect(canUndo()).toBe(false);
        expect(canRedo()).toBe(false);
        setUserID(5);
        expect(canUndo()).toBe(true);
        undo();
        expect(canUndo()).toBe(false);
        expect(canRedo()).toBe(true);
        redo();
        expect(canUndo()).toBe(true);
        expect(canRedo()).toBe(false);
    });

    test('Fires triggers on history change events', () => {
        const {
            store,
            setUserID,
        } = instance;

        const {
            state,
            undo,
            redo,
            onBeforeHistoryChange,
            onAfterHistoryChange,
            onHistoryChangeSuccess,
        } = store;

        const spyFn = vi.fn();

        onBeforeHistoryChange(spyFn);
        onAfterHistoryChange(spyFn);
        onHistoryChangeSuccess(spyFn);

        setUserID(5);
        expect(state.id).toBe(5);
        setUserID(10);
        expect(state.id).toBe(10);
        undo();
        expect(state.id).toBe(5);
        redo();
        expect(state.id).toBe(10);
        expect(spyFn).toHaveBeenCalledTimes(6);
    });

});