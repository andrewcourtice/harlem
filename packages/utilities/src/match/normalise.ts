import isFunction from '../type/is-function';
import isString from '../type/is-string';

import {
    Matcher,
    Predicate,
} from '../types';

export default function normalise(matcher: Matcher): Predicate<string> {
    if (matcher === '*') {
        return () => true;
    }

    if (isFunction(matcher)) {
        return matcher;
    }

    const patterns = ([] as (string | RegExp)[])
        .concat(matcher)
        .map(pattern => isString(pattern)
            ? new RegExp(`^${pattern}$`)
            : pattern
        );

    return value => patterns.some(pattern => pattern.test(value));
}