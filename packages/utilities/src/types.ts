export type UnionToIntersection<TValue> = (TValue extends any ? (arg: TValue) => any : never) extends ((arg: infer I) => void) ? I : never;

export type OneOrMore<TValue> = TValue | TValue[];
export type Predicate<TValue> = (value: TValue) => boolean;
export type Matcher = OneOrMore<string | RegExp> | Predicate<string>;

export interface Constructable<TValue = unknown> {
    constructor: new (...args: unknown[]) => TValue;
}

export interface Disposable {
    dispose(): void;
}

export interface Matchable {
    include: Matcher;
    exclude: Matcher;
}

export type RuntimeType = keyof RuntimeTypeMap;
export interface RuntimeTypeMap {
    boolean: boolean;
    number: number;
    string: string;
    error: Error;
    date: Date;
    regexp: RegExp;
    function: Function;
    symbol: symbol;
    array: Array<unknown>;
    object: object;
    map: Map<unknown, unknown>;
    set: Set<unknown>;
    null: null;
    undefined: undefined;
}