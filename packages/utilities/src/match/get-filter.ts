import normalise from './normalise';

import {
    Matchable,
    Predicate,
} from '../types';

export default function getFilter({ include, exclude }: Matchable): Predicate<string> {
    const includeMatcher = normalise(include);
    const excludeMatcher = normalise(exclude);

    return value => excludeMatcher(value) || !includeMatcher(value);
}