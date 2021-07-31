import {
    createStore,
    MutationHookHandler
} from '../src/index';

function getStore() {
    const {
        state,
        getter,
        mutation,
        onBeforeMutation,
        onAfterMutation
    } = createStore('main', {
        id: 0,
        firstName: 'John',
        lastName: 'Smith'
    }, {
        allowOverwrite: false
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

    const circularParent = mutation('circular-parent', state => {
        circularChild();
    });

    const circularChild = mutation('circular-child', state => {
        circularParent();
    });

    return {
        state,
        getter,
        mutation,
        fullName,
        setId,
        setFirstName,
        setLastName,
        circularParent,
        circularChild,
        onBeforeMutation,
        onAfterMutation
    };
}

describe('Harlem Core', () => {

    const {
        state,
        getter,
        mutation,
        fullName,
        setId,
        setFirstName,
        setLastName,
        circularParent,
        onBeforeMutation,
        onAfterMutation
    } = getStore();

    describe('Store', () => {

        test('Should prevent duplicate creation of store objects', () => {
            const duplicates = [
                () => createStore('main', {}),
                () => getter('fullname', () => {}),
                () => mutation('set-firstname', () => {})
            ];
    
            duplicates.forEach(invokee => {
                expect(() => invokee()).toThrow();
            });
        });

    });

    describe('State', () => {
        
        test('Should be populated', () => {
            expect(state).toHaveProperty('firstName');
            expect(state).toHaveProperty('lastName');
        });
    
        test('Should be readonly', () => {
            // @ts-expect-error
            state.firstName = 'Billy';
    
            expect(state.firstName).toBe('John');
        });

    });

    describe('Getters', () => {

        test('Should be populated', () => {
            expect(fullName.value).toBe('John Smith');
        });

    });

    describe('Mutations', () => {

        test('Should correctly mutate state', () => {
            setFirstName('Jane');
            setLastName('Doe');
    
            expect(state.firstName).toBe('Jane');
            expect(state.lastName).toBe('Doe');
        });

        test('Should return a result from a mutation', () => {
            const id = setId();

            expect(id).toBeDefined();
            expect(typeof id).toBe('number');
        });

        test('Should detect a circular reference', () => {
            expect(() => circularParent()).toThrow();
        });

    });

    describe('Triggers', () => {

        test('Should trigger on onBeforeMutation', () => {
            const handler = jest.fn(({ result }) => {
                expect(result).toBeUndefined();
            }) as MutationHookHandler<any, any>;

            const {
                dispose
            } = onBeforeMutation('set-id', handler);

            setId();

            expect(handler).toHaveBeenCalled();
            dispose();
        });

        test('Should trigger on onAfterMutation', () => {
            const handler = jest.fn(({ result }) => {
                expect(result).not.toBeUndefined();
            }) as MutationHookHandler<any, any>;

            const {
                dispose
            } = onAfterMutation('set-id', handler);

            setId();

            expect(handler).toHaveBeenCalled();
            dispose();
        });

    })

});