import isAny from '../../src/type/is-any';

import {
    describe,
    expect,
    test,
} from 'vitest';

describe('Utilities', () => {

    describe('Type Is Any', () => {

        test('Should verify that a given value matches the specified types', () => {
            expect(isAny(true, ['boolean', 'date'])).toBe(true);
            expect(isAny(true, ['string', 'symbol'])).toBe(false);
            expect(isAny('hello', ['date', 'object'])).toBe(false);
        });

    });

});