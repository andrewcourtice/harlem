import isArray from '../../src/type/is-array';

import {
    describe,
    expect,
    test,
} from 'vitest';

describe('Utilities', () => {

    describe('Type Is Array', () => {

        test('Should verify that a given type is an array', () => {
            expect(isArray(1)).toBe(false);
            expect(isArray('foo')).toBe(false);
            expect(isArray(new Date())).toBe(false);
            expect(isArray([1, 2, 3])).toBe(true);
        });

    });

});