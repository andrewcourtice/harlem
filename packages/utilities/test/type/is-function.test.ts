import isFunction from '../../src/type/is-function';

import {
    describe,
    expect,
    test,
} from 'vitest';

describe('Utilities', () => {

    describe('Type Is Function', () => {

        test('Should verify that a given type is a function', () => {
            expect(isFunction(1)).toBe(false);
            expect(isFunction('foo')).toBe(false);
            expect(isFunction(new Date())).toBe(false);
            expect(isFunction(() => void(0))).toBe(true);
        });

    });

});