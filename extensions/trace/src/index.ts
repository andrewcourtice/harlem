import {
    GATE_COLOUR,
} from './constants';

import {
    BaseState,
    EVENTS,
    InternalStore,
} from '@harlem/core';

import {
    clone,
    isArray,
    isObject,
    toPath,
} from '@harlem/utilities';

import type {
    GateMap,
    Options,
    TraceCallback,
    TraceGate,
    TraceListener,
    TraceOptions,
    TraceResult,
} from './types';

export * from './types';

const GATE_MAP = {
    get: (callback, { hasGetGate, gates, paths }) => (target, prop) => {
        const value = target[prop];

        if (hasGetGate) {
            defaultCallback(callback, 'get', paths, prop, value, value);
        }

        return deepTrace(value, callback, {
            gates,
            hasGetGate,
            paths: paths.concat(prop),
        });
    },
    set: (callback, { paths }) => (target, prop, value) => {
        defaultCallback(callback, 'set', paths, prop, target[prop], value);
        target[prop] = value;
        return true;
    },
    deleteProperty: (callback, { paths }) => (target, prop) => {
        defaultCallback(callback, 'deleteProperty', paths, prop, target[prop]);
        delete target[prop];
        return true;
    },
} as GateMap;

function defaultCallback<TValue extends object>(
    callback: TraceCallback<TValue>,
    gate: TraceGate<TValue>,
    paths: PropertyKey[],
    prop: PropertyKey,
    oldValue: unknown,
    newValue?: unknown
) {
    try {
        const nodes = paths.slice();

        callback({
            gate,
            nodes,
            prop,
            newValue,
            oldValue: newValue === oldValue ? oldValue : clone(oldValue),
            get path() {
                return toPath(nodes.concat(prop));
            },
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

function trace<TValue extends object>(value: TValue, gates: TraceGate<TValue> | TraceGate<TValue>[], callback: TraceCallback<TValue>): TValue {
    const allGates = ([] as TraceGate<TValue>[]).concat(gates);
    const hasGetGate = allGates.includes('get');

    return deepTrace(value, callback, {
        hasGetGate,
        gates: hasGetGate ? allGates : allGates.concat('get'),
        paths: [],
    });
}

function logResult<TValue extends object>({ gate, path }: TraceResult<TValue>) {
    const {
        foreground,
        background,
    } = (GATE_COLOUR[gate] || GATE_COLOUR.default);

    const style = [
        'padding: 3px',
        'font-weight: bold',
        'border-radius: 3px',
        `color: ${foreground}`,
        `background-color: ${background}`,
    ].join(';');

    // @ts-ignore - This is an intentional console statement
    console.log(`%c${gate}%c ${path}`, style, '');
}

export default function traceExtension<TState extends BaseState>(options?: Partial<Options>) {
    const {
        autoStart,
        debug,
    } = {
        autoStart: false,
        debug: false,
        ...options,
    } as Options;

    return (store: InternalStore<TState>) => {
        store.register('extensions', 'trace', () => options);

        const traceCallbacks = new Set<TraceCallback<TState>>();

        function startTrace(gates: TraceGate<TState> | TraceGate<TState>[] = 'set') {
            store.provider('write', state => trace(state, gates, result => {
                if (debug) {
                    logResult(result);
                }

                traceCallbacks.forEach(callback => callback(result));
            }));
        }

        function stopTrace() {
            store.provider('write', state => state);
        }

        function onTraceResult(callback: TraceCallback<TState>): TraceListener {
            traceCallbacks.add(callback);

            return {
                dispose: () => traceCallbacks.delete(callback),
            };
        }

        store.once(EVENTS.store.created, () => {
            if (autoStart) {
                startTrace();
            }
        });

        store.once(EVENTS.store.destroyed, () => traceCallbacks.clear());

        return {
            startTrace,
            stopTrace,
            onTraceResult,
        };
    };
}

