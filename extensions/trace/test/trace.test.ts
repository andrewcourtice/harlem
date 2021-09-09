import {
    getStore,
    bootstrap,
} from '@harlem/testing';

import traceExtension from '../src';

describe('Trace Extension', () => {

    const getInstance = () => getStore({
        extensions: [
            traceExtension(),
        ],
    });

    let instance = getInstance();

    beforeAll(() => bootstrap());
    beforeEach(() => instance = getInstance());
    afterEach(() => instance.store.destroy());

    test('Run a trace', () => {
        const {
            store,
            setUserID,
            setUserDetails,
        } = instance;

        const {
            startTrace,
            stopTrace,
            onTraceResult,
        } = store;

        const callback = jest.fn();

        onTraceResult(callback);
        startTrace();

        setUserID(5);
        setUserDetails({
            firstName: 'John',
            lastName: 'Smith',
            age: 35,
        });

        stopTrace();

        expect(callback).toHaveBeenCalledTimes(4);
    });

});