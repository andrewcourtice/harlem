import omit from '../../src/object/omit';

import {
    describe,
    expect,
    test,
} from 'vitest';

describe('Utilities', () => {

    describe('Object Omit', () => {

        test('Should omit top-level properties from an object', () => {
            const source = {
                propA: 1,
                propB: 'foo',
                propC: 'bar',
                propD: [1, 2, 3],
            };

            const output = omit(source, /^propC/);

            expect(output).not.toHaveProperty('propC');
        });

    });

});