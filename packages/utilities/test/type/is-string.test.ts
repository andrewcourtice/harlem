import isString from '../../src/type/is-string';

import {
    describe,
    expect,
    test,
} from 'vitest';

describe('Utilities', () => {

    describe('Type Is String', () => {

        test('Should verify that a given type is a string', () => {
            expect(isString(1)).toBe(false);
            expect(isString('foo')).toBe(true);
            expect(isString(new Date())).toBe(false);
            expect(isString(() => void(0))).toBe(false);
        });

    });

});