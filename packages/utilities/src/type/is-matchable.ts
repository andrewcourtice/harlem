import isObject from './is-object';

import type {
    Matchable,
} from '../types';

export default function isMatchable(value: unknown): value is Matchable {
    return isObject(value)
        && 'include' in value
        && 'exclude' in value;
}