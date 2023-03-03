import {
    OneOrMore,
} from '@harlem/utilities';

export type TraceGate<TValue extends object> = keyof ProxyHandler<TValue>;
export type TraceCallback<TValue extends object> = (result: TraceResult<TValue>) => void;

export type GateMap<TValue extends object = any> = {
    [TGate in TraceGate<TValue>]?: (callback: TraceCallback<TValue>, options: TraceOptions<TValue>) => ProxyHandler<TValue>[TGate];
}

export interface TraceOptions<TValue extends object> {
    gates: TraceGate<TValue>[];
    paths: PropertyKey[];
    hasGetGate: boolean;
}

export interface TraceResult<TValue extends object> {
    readonly path: string;
    gate: TraceGate<TValue>;
    nodes: PropertyKey[];
    prop: PropertyKey;
    oldValue: unknown;
    newValue: unknown;
}

export interface TagStyleOptions {
    background: string;
    foreground: string;
}

export interface TrackEventOptions {
    style: Partial<TagStyleOptions>;
    events: {
        before: string;
        after: string;
    };
}

export interface DebugOptions<TValue extends object> {
    gates: OneOrMore<TraceGate<TValue>>;
    mutations: boolean;
    actions: boolean;
}

export interface Options<TValue extends object> {
    autoStart: boolean | OneOrMore<TraceGate<TValue>>;
    debug: boolean | Partial<DebugOptions<TValue>>;
}