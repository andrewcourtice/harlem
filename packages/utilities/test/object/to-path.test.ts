import toPath from '../../src/object/to-path';

describe('Utilities', () => {

    describe('Object To Path', () => {

        test('Should create a path from a list of nodes', () => {
            const nodes = ['user', 'details', 'roles', 1, 'id'];
            const path = '/user/details/roles[1]/id';

            expect(toPath(nodes)).toBe(path);
        });

    });

});