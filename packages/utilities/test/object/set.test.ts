import set from '../../src/object/set';

import {
    describe,
    expect,
    test,
} from 'vitest';

describe('Utilities', () => {

    describe('Object Set', () => {

        test('Should set a value at a given path', () => {
            const source = {
                propA: 1,
                propB: 'foo',
                propC: 'bar',
                propD: [1, 2, 3],
                propE: {
                    propEA: 5,
                },
            };

            set(source, 'propB', 'blah');
            expect(source.propB).toBe('blah');

            set(source, 'propD/1', 15);
            expect(source.propD[1]).toBe(15);

            set(source, 'propE/propEA', 10);
            expect(source.propE.propEA).toBe(10);

            set(source, 'propC', 'bingo', /^propC/);
            expect(source.propC).toBe('bar');

            set(source, '', {
                thing: 'hello',
            });
            expect(source).toHaveProperty('thing');
            expect(source.thing).toBe('hello');
        });

    });

});