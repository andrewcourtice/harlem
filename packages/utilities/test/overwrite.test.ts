import overwrite from '../src/overwrite';

describe('Utilities', () => {

    describe('Overwrite', () => {

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

    });

});