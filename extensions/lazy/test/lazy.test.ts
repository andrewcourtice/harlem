import lazyExtension from '../src';

import {
    bootstrap,
    getStore,
} from '@harlem/testing';

import {
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    test,
} from 'vitest';

describe('Lazy Extension', () => {

    const getInstance = () => getStore({
        extensions: [
            lazyExtension(),
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



    });

});