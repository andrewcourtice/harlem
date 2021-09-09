import isObject from '../../src/type/is-object';

describe('Utilities', () => {

    describe('Type Is Object', () => {

        test('Should verify that a given type is an object', () => {
            expect(isObject(1)).toBe(false);
            expect(isObject('foo')).toBe(false);
            expect(isObject([1, 2, 3])).toBe(false);
            expect(isObject({})).toBe(true);
        });

    });

});