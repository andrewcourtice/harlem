import overwrite from '../../src/object/overwrite';

import {
    describe,
    test,
    expect,
} from 'vitest';

describe('Utilities', () => {

    describe('Object Overwrite', () => {

        test('Should overwrite an objects properties with anothers', () => {
            const source = {
                a: 1,
                b: null,
                c: 'Hello',
                d: {
                    a: new Date(),
                },
                e: [1, 2, 3],
            };

            overwrite(source, {
                a: 'hello',
                b: 5,
                d: [1, 2],
            });

            expect(typeof source.a).toBe('string');
            expect(typeof source.b).toBe('number');
            expect(source.c).toBeUndefined();
            expect(Array.isArray(source.d)).toBe(true);
            expect(source.e).toBeUndefined();
        });

        test('Should handle a top-level ignore pattern', () => {
            const source = {
                a: 1,
                b: null,
                c: 'Hello',
                d: 26,
                e: [1, 2, 3],
            };

            overwrite(source, {
                a: 'hello',
                b: 5,
                c: [1, 2],
                d: 35,
            }, /^d/);

            expect(typeof source.a).toBe('string');
            expect(typeof source.b).toBe('number');
            expect(Array.isArray(source.c)).toBe(true);
            expect(source.d).toBe(26);
            expect(source.e).toBeUndefined();
        });

    });

});