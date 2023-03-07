import clamp from '../../src/number/clamp';

import {
    describe,
    expect,
    test,
} from 'vitest';

describe('Utilities', () => {

    describe('Number Clamp', () => {

        test('Should clamp the given value between the specified lower/upper bounds', () => {
            expect(clamp(25, 10, 20)).toBe(20);
            expect(clamp(-50, 0, 100)).toBe(0);
        });

    });

});