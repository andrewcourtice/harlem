import getType from './get-type';

import type {
    Constructable,
    RuntimeType,
} from './types';

function cloneIdentity(input: unknown): unknown {
    return input;
}

function cloneBasic(input: Constructable): unknown {
    return new input.constructor(input);
}

function cloneSymbol(input: symbol): symbol {
    return Object(Symbol.prototype.valueOf.call(input));
}

function cloneObject(input: Record<PropertyKey, unknown>): Record<PropertyKey, unknown> {
    const output: Record<PropertyKey, unknown> = {};

    for (const key in input) {
        output[key] = clone(input[key]);
    }

    return output;
}

function cloneArray(input: unknown[]): unknown[] {
    return input.map(clone);
}

function cloneSet(input: Set<unknown>): Set<unknown> {
    const output = new Set();

    input.forEach(value => {
        output.add(clone(value));
    });

    return output;
}

function cloneMap(input: Map<unknown, unknown>): Map<unknown, unknown> {
    const output = new Map();

    input.forEach((value, key) => {
        output.set(key, clone(value));
    });

    return output;
}

const CLONE_MAP = {
    default: () => null,
    null: () => null,
    undefined: () => null,
    boolean: cloneBasic,
    number: cloneBasic,
    string: cloneBasic,
    error: cloneBasic,
    date: cloneBasic,
    regexp: cloneBasic,
    function: cloneIdentity,
    symbol: cloneSymbol,
    array: cloneArray,
    object: cloneObject,
    map: cloneMap,
    set: cloneSet,
} as Record<RuntimeType | 'default', ((value: unknown) => unknown)>;

export default function clone<TValue = unknown>(value: TValue): TValue {
    if (typeof value !== 'object' || value === null) {
        return value;
    }

    const type = getType(value);
    const cloner = CLONE_MAP[type] || CLONE_MAP.default;

    return cloner(value) as TValue;
}