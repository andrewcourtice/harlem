import isArray from '../type/is-array';
import isObject from '../type/is-object';
import clone from './clone';

type TraceGate<TValue extends object> = keyof ProxyHandler<TValue>;
type TraceCallback<TValue extends object> = (result: TraceResult<TValue>) => void;

interface TraceOptions<TValue extends object> {
    gates: TraceGate<TValue>[];
    paths: PropertyKey[];
    hasGetGate: boolean;
}

interface TraceResult<TValue extends object> {
    gate: TraceGate<TValue>;
    paths: PropertyKey[];
    oldValue: unknown;
    newValue: unknown;
}

type GateMap<TValue extends object = any> = {
    [TGate in TraceGate<TValue>]?: (callback: TraceCallback<TValue>, options: TraceOptions<TValue>) => ProxyHandler<TValue>[TGate];
}

const GATE_MAP = {
    get: (callback, { hasGetGate, gates, paths }) => (target, prop, receiver) => {
        const value = Reflect.get(target, prop, receiver);

        if (hasGetGate) {
            defaultCallback(callback, 'get', paths, prop, value, value);
        }

        return deepTrace(value, callback, {
            gates,
            hasGetGate,
            paths: paths.concat(prop),
        });
    },
    set: (callback, { paths }) => (target, prop, value, receiver) => {
        defaultCallback(callback, 'set', paths, prop, target[prop], value);
        return Reflect.set(target, prop, value, receiver);
    },
    deleteProperty: (callback, { paths }) => (target, prop) => {
        defaultCallback(callback, 'deleteProperty', paths, prop, target[prop]);
        return Reflect.deleteProperty(target, prop);
    },
} as GateMap;

function defaultCallback<TValue extends object>(callback: TraceCallback<TValue>, gate: TraceGate<TValue>, paths: PropertyKey[], key: PropertyKey, oldValue: unknown, newValue?: unknown) {
    try {
        callback({
            gate,
            newValue,
            paths: paths.concat(key),
            oldValue: newValue === oldValue ? oldValue : clone(oldValue),
        });
    } catch {
        console.warn('Trace callback failed');
    }
}

function deepTrace<TValue extends object>(value: TValue, callback: TraceCallback<TValue>, options: TraceOptions<TValue>): TValue {
    if (!isObject(value) && !isArray(value)) {
        return value;
    }

    const {
        gates,
    } = options;

    const handler = gates.reduce((output, gate) => {
        const gateHandler = (GATE_MAP as GateMap<TValue>)[gate];

        if (gateHandler) {
            output[gate] = gateHandler(callback, options)?.bind(output) as any;
        }

        return output;
    }, {} as ProxyHandler<TValue>);

    return new Proxy(value, handler);
}

export default function trace<TValue extends object>(value: TValue, gates: TraceGate<TValue> | TraceGate<TValue>[], callback: TraceCallback<TValue>): TValue {
    const allGates = ([] as TraceGate<TValue>[]).concat(gates);
    const hasGetGate = allGates.includes('get');

    return deepTrace(value, callback, {
        hasGetGate,
        gates: hasGetGate ? allGates : allGates.concat('get'),
        paths: [],
    });
}