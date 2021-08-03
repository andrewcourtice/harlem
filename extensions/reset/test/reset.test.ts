import {
    getStore,
    bootstrap,
} from '@harlem/testing';

import resetExtension from '../src';

describe('Reset Extension', () => {

    const getInstance = () => getStore({
        extensions: [
            resetExtension(),
        ],
    });

    let instance = getInstance();

    beforeAll(() => bootstrap());
    beforeEach(() => instance = getInstance());
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
        });

        expect(store.state.id).toBe(5);
        expect(store.state.details.firstName).toBe('John');
        expect(store.state.details.lastName).toBe('Smith');

        store.reset();

        expect(store.state.id).toBe(0);
        expect(store.state.details.firstName).toBe('');
        expect(store.state.details.lastName).toBe('');
    });

    // test('Performs a partial reset', () => {
    //     const {
    //         store,
    //         setUserID,
    //         setUserDetails,
    //     } = instance;

    //     setUserID(7);
    //     setUserDetails({
    //         firstName: 'John',
    //         lastName: 'Smith',
    //         age: 35,
    //     });

    //     expect(store.state.id).toBe(7);
    //     expect(store.state.details.firstName).toBe('John');
    //     expect(store.state.details.lastName).toBe('Smith');
    //     expect(store.state.details.age).toBe(35);

    //     store.reset(state => state.details);

    //     expect(store.state.id).toBe(7);
    //     expect(store.state.details.firstName).toBe('');
    //     expect(store.state.details.lastName).toBe('');
    //     expect(store.state.details.age).toBe(0);
    // });

});