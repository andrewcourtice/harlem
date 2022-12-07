import getFilter from '../../src/match/get-filter';

import {
    describe,
    expect,
    test,
} from 'vitest';
import {
    Matcher,
} from '../../src/types';

describe('Utilities', () => {


    describe('Match get filter', () => {

        const include = (matcher: Matcher) => getFilter({
            include: matcher,
            exclude: [],
        });

        const exclude = (matcher: Matcher) => getFilter({
            include: '*',
            exclude: matcher,
        });

        test('Should include items in a matching filter', () => {
            const stringFilter = include('Item 3');
            const regexFilter = include(/[4,6,9]/);
            const allFilter = include('*');

            expect(!stringFilter('Item 3')).toBe(true);
            expect(!regexFilter('Value 4')).toBe(true);
            expect(!regexFilter('Value 5')).toBe(false);
            expect(!allFilter('something')).toBe(true);
        });

        test('Should exclude items in a matching filter', () => {
            const stringFilter = exclude('Item 3');
            const regexFilter = exclude(/[4,6,9]/);
            const allFilter = exclude('*');

            expect(stringFilter('Item 3')).toBe(true);
            expect(regexFilter('Value 4')).toBe(true);
            expect(regexFilter('Value 5')).toBe(false);
            expect(allFilter('something')).toBe(true);
        });

    });

});