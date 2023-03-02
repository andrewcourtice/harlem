import isBoolean from '../../src/type/is-boolean';

import {
    describe,
    expect,
    test,
} from 'vitest';

describe('Utilities', () => {

    describe('Type Is Boolean', () => {

        test('Should verify that a given type is a boolean', () => {
            expect(isBoolean(true)).toBe(true);
            expect(isBoolean(false)).toBe(true);
            expect(isBoolean(1)).toBe(false);
            expect(isBoolean('foo')).toBe(false);
            expect(isBoolean(new Date())).toBe(false);
            expect(isBoolean(() => void(0))).toBe(false);
        });

    });

});