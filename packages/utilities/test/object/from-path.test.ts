import fromPath from '../../src/object/from-path';

import {
    describe,
    test,
    expect,
} from 'vitest';

describe('Utilities', () => {

    describe('Object From Path', () => {

        test('Should get the value of an object at the specified path', () => {
            const source = {
                user: {
                    details: {
                        name: 'John',
                    },
                },
            };

            const name = fromPath(source, 'user/details/name');

            expect(name).toBe(source.user.details.name);
        });

    });

});