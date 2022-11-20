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

export type RuntimeType = 'boolean'
| 'number'
| 'string'
| 'error'
| 'date'
| 'regexp'
| 'function'
| 'symbol'
| 'array'
| 'object'
| 'map'
| 'set'
| 'null'
| 'undefined';