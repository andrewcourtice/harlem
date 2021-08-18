import getType from '../type/get-type';

import {
    unref,
    UnwrapRef
} from 'vue';

import type {
    Constructable,
    RuntimeType,
} from '../types';

function cloneIdentity(input: unknown): unknown {
    return input;
}

function cloneBasic(input: Constructable): unknown {
    return new input.constructor(input);
}

function cloneRegex(input: RegExp): RegExp {
    const clonedRegex = new RegExp(input.source);
    clonedRegex.lastIndex = input.lastIndex;

    return clonedRegex;
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
    default: cloneIdentity,

    // Primitives
    null: cloneIdentity,
    undefined: cloneIdentity,
    boolean: cloneBasic, // only for new Boolean()
    number: cloneBasic, // only for new Number()
    string: cloneBasic, // only for new String()

    // Objects
    error: cloneBasic,
    date: cloneBasic,
    regexp: cloneRegex,
    function: cloneIdentity,
    symbol: cloneSymbol,
    array: cloneArray,
    object: cloneObject,
    map: cloneMap,
    set: cloneSet,
} as Record<RuntimeType | 'default', ((value: unknown) => unknown)>;

export default function clone<TValue = unknown>(value: TValue): UnwrapRef<TValue> {
    if (typeof value !== 'object' || value === null) {
        return value as UnwrapRef<TValue>;
    }

    const type = getType(value);
    const cloner = CLONE_MAP[type] || CLONE_MAP.default;
    const input = unref(value);

    return cloner(input) as UnwrapRef<TValue>;
}