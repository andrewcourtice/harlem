import lazyExtension from '../src';

import {
    bootstrap,
    getStore,
    sleep,
} from '@harlem/testing';

import {
    nextTick,
} from 'vue';

import {
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    expect,
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
    beforeEach(() => {
        instance = getInstance();
    });

    afterEach(() => instance.store.destroy());

    test('Performs a lazy evaluation', async () => {
        expect.assertions(3);

        const {
            store,
            setUserDetails,
        } = instance;

        const [
            fullname,
            isEvaluating,
        ] = store.lazy('lazy', async ({ details }) => new Promise<string>(resolve => {
            setTimeout(() => resolve(`${details.firstName} ${details.lastName}`), 500);
        }));

        setUserDetails({
            firstName: 'Jane',
            lastName: 'Doe',
        });

        await nextTick();

        expect(isEvaluating.value).toBe(true);
        await sleep(600);
        expect(isEvaluating.value).toBe(false);
        expect(fullname.value).toBe('Jane Doe');
    });

});