import {
    createStore,
    MutationHookHandler,
} from '../src/index';

import {
    isRef,
    ref,
} from 'vue';

function getStore() {
    const {
        state,
        getter,
        mutation,
        ...store
    } = createStore('main', {
        id: 0,
        firstName: 'John',
        lastName: 'Smith',
    }, {
        allowOverwrite: false,
    });

    const fullName = getter('fullname', state => `${state.firstName} ${state.lastName}`);

    const setId = mutation<undefined, number>('set-id', state => {
        const id = Math.round(Math.random() * 100000);

        state.id = id;
        return id;
    });

    const setFirstName = mutation<string>('set-firstname', (state, payload) => {
        state.firstName = payload;
    });

    const setLastName = mutation<string>('set-lastname', (state, payload) => {
        state.lastName = payload;
    });

    return {
        state,
        getter,
        mutation,
        fullName,
        setId,
        setFirstName,
        setLastName,
        ...store,
    };
}

describe('Harlem Core', () => {

    let store = getStore();

    afterEach(() => {
        store?.destroy();
        store = getStore();
    });

    describe('Store', () => {

        test('Should prevent duplicate creation of store objects', () => {
            const {
                getter,
                mutation,
            } = store;

            const duplicates = [
                () => createStore('main', {}),
                () => getter('fullname', () => {}),
                () => mutation('set-firstname', () => {}),
            ];

            duplicates.forEach(invokee => {
                expect(() => invokee()).toThrow();
            });
        });

    });

    describe('State', () => {

        test('Should be populated', () => {
            const {
                state,
            } = store;

            expect(state).toHaveProperty('firstName');
            expect(state).toHaveProperty('lastName');
        });

        test('Should be readonly', () => {
            const {
                state,
            } = store;

            // @ts-expect-error
            state.firstName = 'Billy';

            expect(state.firstName).toBe('John');
        });

    });

    describe('Getters', () => {

        test('Should be populated', () => {
            const {
                fullName,
            } = store;

            expect(fullName.value).toBe('John Smith');
        });

    });

    describe('Mutations', () => {

        test('Should correctly mutate state', () => {
            const {
                state,
                setFirstName,
                setLastName,
            } = store;

            setFirstName('Jane');
            setLastName('Doe');

            expect(state.firstName).toBe('Jane');
            expect(state.lastName).toBe('Doe');
        });

        test('Should return a result from a mutation', () => {
            const {
                setId,
            } = store;

            const id = setId();

            expect(id).toBeDefined();
            expect(typeof id).toBe('number');
        });

        test('Should detect a circular reference', () => {
            const {
                mutation,
            } = store;

            let circularParent = () => {};
            let circularChild = () => {};

            circularParent = mutation('circular-parent', () => circularChild());
            circularChild = mutation('circular-child', () => circularParent());

            expect(() => circularParent()).toThrow();
        });

    });

    describe('Triggers', () => {

        test('Should trigger on onBeforeMutation', () => {
            const {
                setId,
                onBeforeMutation,
            } = store;

            const handler = jest.fn(({ result }) => {
                expect(result).toBeUndefined();
            }) as MutationHookHandler<any, any>;

            const {
                dispose,
            } = onBeforeMutation('set-id', handler);

            setId();

            expect(handler).toHaveBeenCalled();
            dispose();
        });

        test('Should trigger on onAfterMutation', () => {
            const {
                setId,
                onAfterMutation,
            } = store;

            const handler = jest.fn(({ result }) => {
                expect(result).not.toBeUndefined();
            }) as MutationHookHandler<any, any>;

            const {
                dispose,
            } = onAfterMutation('set-id', handler);

            setId();

            expect(handler).toHaveBeenCalled();
            dispose();
        });

        test('Should not fire if events are suppressed', () => {
            const {
                suppress,
                setId,
                onAfterMutation,
            } = store;

            const handler = jest.fn();

            const {
                dispose,
            } = onAfterMutation('set-id', handler);

            suppress(() => setId());

            expect(handler).not.toHaveBeenCalled();
            dispose();
        });

    });

    describe('Producers', () => {

        test('Should clean payloads by default', () => {
            const {
                state,
                mutation,
            } = store;

            const payload = {
                firstName: ref('Jim'),
            };

            const setRefToState = mutation<typeof payload>('set-ref-to-state', (state, { firstName }) => {
                state.firstName = firstName as unknown as string;
            });

            setRefToState(payload);

            expect(isRef(state.firstName)).toBe(false);
            expect(state.firstName).toBe('Jim');
        });

    });

});