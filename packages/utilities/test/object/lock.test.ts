import lock from '../../src/object/lock';

import {
    describe,
    expect,
    test,
} from 'vitest';

describe('Utilities', () => {

    describe('Object Lock', () => {

        test('Should prevent access to the specified properties', () => {
            const locked = lock({
                a: 1,
                b: 'foo',
            }, ['a']);

            expect(() => locked.a).toThrow();
        });

    });

});