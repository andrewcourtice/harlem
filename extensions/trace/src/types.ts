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
    gate: TraceGate<TValue>;
    paths: PropertyKey[];
    oldValue: unknown;
    newValue: unknown;
}

export interface TraceListener {
    dispose(): void;
}

export interface Options {
    autoStart: boolean;
}