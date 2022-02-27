import lazyExtension from '../src';

import {
    getStore,
    bootstrap,
} from '@harlem/testing';

import {
    describe,
    test,
    expect,
    beforeAll,
    beforeEach,
    afterEach,
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