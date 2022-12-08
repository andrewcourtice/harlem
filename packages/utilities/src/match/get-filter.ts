import normalise from './normalise';

import {
    Matchable,
    Predicate,
} from '../types';

export default function getFilter({
    include = '*',
    exclude = [],
}: Partial<Matchable>): Predicate<string> {
    const includeMatcher = normalise(include);
    const excludeMatcher = normalise(exclude);

    return value => includeMatcher(value) && !excludeMatcher(value);
}