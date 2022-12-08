import normaliseMatcher from '../match/normalise';

import type{
    Matcher,
} from '../types';

export default function omit<TValue extends object>(value: TValue, matcher: Matcher): TValue {
    const output = {} as TValue;
    const filter = normaliseMatcher(matcher);

    for (const key in value) {
        if (!filter(key)) {
            output[key] = value[key];
        }
    }

    return output;
}