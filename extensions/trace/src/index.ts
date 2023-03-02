/* eslint-disable no-console */

import {
    GATE_TAG_STYLE,
    TAG_STYLE,
} from './constants';

import {
    BaseState,
    EventPayload,
    EVENTS,
    InternalStore,
    PRODUCERS,
    TriggerEventData,
} from '@harlem/core';

import {
    Disposable,
    objectClone,
    objectToPath,
    typeIsArray,
    typeIsBoolean,
    typeIsObject,
} from '@harlem/utilities';

import type {
    GateMap,
    Options,
    TagStyleOptions,
    TraceCallback,
    TraceGate,
    TraceOptions,
    TraceResult,
    TrackEventOptions,
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
            oldValue: newValue === oldValue ? oldValue : objectClone(oldValue),
            get path() {
                return objectToPath(nodes.concat(prop));
            },
        });
    } catch {
        console.warn('Trace callback failed');
    }
}

function deepTrace<TValue extends object>(value: TValue, callback: TraceCallback<TValue>, options: TraceOptions<TValue>): TValue {
    if (!typeIsObject(value) && !typeIsArray(value)) {
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

function getTagStyle(options: Partial<TagStyleOptions>) {
    const {
        background,
        foreground,
    } = {
        ...TAG_STYLE,
        ...options,
    };

    return [
        'padding: 0.25em 0.5em',
        'font-weight: bold',
        'border-radius: 3px',
        `color: ${foreground}`,
        `background-color: ${background}`,
    ].join(';');
}

function logResult<TValue extends object>({ gate, path }: TraceResult<TValue>) {
    const style = getTagStyle(GATE_TAG_STYLE[gate] || TAG_STYLE);

    console.log(`%c${gate}%c ${path}`, style, '');
}

export default function traceExtension<TState extends BaseState>(options?: Partial<Options<TState>>) {
    const _options = {
        autoStart: false,
        debug: false,
        ...options,
    };

    return (store: InternalStore<TState>) => {
        store.register('extensions', 'trace', () => _options);

        const traceCallbacks = new Set<TraceCallback<TState>>();
        const trackMutations = _options.debug === true || (!typeIsBoolean(_options.debug) && _options.debug.mutations);
        const trackActions = _options.debug === true || (!typeIsBoolean(_options.debug) && _options.debug.actions);

        function startTrace(gates: TraceGate<TState> | TraceGate<TState>[] = 'set') {
            store.producers.write = state => trace(state, gates, result => {
                if (_options.debug) {
                    logResult(result);
                }

                traceCallbacks.forEach(callback => callback(result));
            });
        }

        function stopTrace() {
            store.producers.write = PRODUCERS.write;
        }

        function onTraceResult(callback: TraceCallback<TState>): Disposable {
            traceCallbacks.add(callback);

            return {
                dispose: () => traceCallbacks.delete(callback),
            };
        }

        function trackEvent(name: string, options: TrackEventOptions) {
            const style = getTagStyle(options.style);

            store.on(options.events.before, (event?: EventPayload<TriggerEventData>) => {
                if (event) {
                    console.group(`%c${name}%c ${event.data.name}`, style, '');
                }
            });

            store.on(options.events.after, () => console.groupEnd());
        }

        store.once(EVENTS.store.created, () => {
            if (_options.autoStart) {
                startTrace();
            }
        });

        store.once(EVENTS.store.destroyed, () => traceCallbacks.clear());

        if (trackMutations) {
            trackEvent('Mutation', {
                events: {
                    before: EVENTS.mutation.before,
                    after: EVENTS.mutation.after,
                },
                style: {
                    background: '#EC4899',
                },
            });
        }

        if (trackActions) {
            trackEvent('Action', {
                events: {
                    before: EVENTS.action.before,
                    after: EVENTS.action.after,
                },
                style: {
                    background: '#8B5CF6',
                },
            });
        }

        return {
            startTrace,
            stopTrace,
            onTraceResult,
        };
    };
}

