import isMatchable from '../../src/type/is-matchable';

import {
    describe,
    expect,
    test,
} from 'vitest';

describe('Utilities', () => {

    describe('Type Is Matchable', () => {

        test('Should verify that a given value is matchable', () => {
            expect(isMatchable({
                include: '*',
                exclude: ['errors'],
            })).toBe(true);
        });

    });

});