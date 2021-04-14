import getType from './get-type';

import type {
    RuntimeType
} from './types';

function cloneIdentity(input: any): any {
    return input;
}

function cloneBasic(input: any): any {
    return new input.constructor(input);
}

function cloneSymbol(input: Symbol): Symbol {
    return Object(Symbol.prototype.valueOf.call(input));
}

function cloneObject(input: Record<PropertyKey, any>): Record<PropertyKey, any> {
    const output: Record<PropertyKey, any> = {};

    for (const key in input) {
        output[key] = clone(input[key]);
    }

    return output;
}

function cloneArray(input: any[]): any[] {
    return input.map(clone);
}

function cloneSet(input: Set<any>): Set<any> {
    const output = new Set();

    input.forEach(value => {
        output.add(clone(value));
    });

    return output;
}

function cloneMap(input: Map<any, any>): Map<any, any> {
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
    set: cloneSet
} as Record<RuntimeType | 'default', ((value: any) => any)>;

export default function clone(value: any) {
    if (typeof value !== 'object' || value === null) {
        return value;
    }

    const type = getType(value);
    const cloner = CLONE_MAP[type] || CLONE_MAP.default;

    return cloner(value);
}