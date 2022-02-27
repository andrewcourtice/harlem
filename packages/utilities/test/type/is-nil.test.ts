import isNil from '../../src/type/is-nil';

import {
    describe,
    test,
    expect,
} from 'vitest';

describe('Utilities', () => {

    describe('Type Is Nil', () => {

        test('Should verify that a given type is nil', () => {
            expect(isNil(undefined)).toBe(true);
            expect(isNil(null)).toBe(true);
            expect(isNil(void 0)).toBe(true);
            expect(isNil(NaN)).toBe(false);
            expect(isNil(false)).toBe(false);
            expect(isNil(0)).toBe(false);
        });

    });

});