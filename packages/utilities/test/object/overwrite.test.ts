import overwrite from '../../src/object/overwrite';

import {
    describe,
    expect,
    test,
} from 'vitest';

describe('Utilities', () => {

    describe('Object Overwrite', () => {

        test('Should overwrite an objects properties with anothers', () => {
            const source = {
                propA: 1,
                propB: null,
                propC: 'Hello',
                propD: {
                    propA: new Date(),
                },
                propE: [1, 2, 3],
            };

            overwrite(source, {
                propA: 'hello',
                propB: 5,
                propD: [1, 2],
            });

            expect(typeof source.propA).toBe('string');
            expect(typeof source.propB).toBe('number');
            expect(source.propC).toBeUndefined();
            expect(Array.isArray(source.propD)).toBe(true);
            expect(source.propE).toBeUndefined();
        });

    });

});