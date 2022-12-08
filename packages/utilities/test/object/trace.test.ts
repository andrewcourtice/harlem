import trace from '../../src/object/trace';

import {
    describe,
    expect,
    test,
} from 'vitest';

describe('Utilities', () => {

    describe('Object Trace', () => {

        test('Should trace access to an objects properties', () => {
            const {
                value,
                getNodes,
            } = trace<any>();

            const foo = value.foo[2].bar['hello'];
            const path = getNodes().join('/');

            expect(path).toBe('foo/2/bar/hello');
        });

    });

});