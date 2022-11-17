import isFunction from '../type/is-function';
import isString from '../type/is-string';

import {
    Matchable,
    Matcher,
    Predicate,
} from '../types';

function normaliseMatcher(matcher: Matcher): Predicate<string> {
    if (matcher === '*') {
        return () => true;
    }

    if (isFunction(matcher)) {
        return matcher;
    }

    const patterns = ([] as (string | RegExp)[])
        .concat(matcher)
        .map(pattern => isString(pattern)
            ? new RegExp(pattern)
            : pattern
        );

    return value => patterns.some(pattern => pattern.test(value));
}

export default function getFilter({ include, exclude }: Matchable): Predicate<string> {
    const includeMatcher = normaliseMatcher(include);
    const excludeMatcher = normaliseMatcher(exclude);

    return value => excludeMatcher(value) || !includeMatcher(value);
}