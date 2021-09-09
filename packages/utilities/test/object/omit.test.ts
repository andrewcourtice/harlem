import omit from '../../src/object/omit';

describe('Utilities', () => {

    describe('Object Omit', () => {

        test('Should omit top-level properties from an object', () => {
            const source = {
                a: 1,
                b: 'foo',
                c: 'bar',
                d: [1, 2, 3],
            };

            const output = omit(source, /^c/);

            expect(output).not.toHaveProperty('c');
        });

    });

});