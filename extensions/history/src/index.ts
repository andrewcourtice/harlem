import {
    CHANGE_MAP,
    DEFAULT_GROUP_KEY,
    EVENTS,
    MUTATION_FILTER,
    SENDER,
    TYPE_OFFSET,
} from './constants';

import {
    markRaw,
    reactive,
} from 'vue';

import {
    BaseState,
    EVENTS as CORE_EVENTS,
    EventPayload,
    InternalStore,
    TriggerEventData,
} from '@harlem/core';

import traceExtension, {
    TraceResult,
} from '@harlem/extension-trace';

import {
    Disposable,
    matchGetFilter,
    numberClamp,
    objectFromPath,
    typeIsMatchable,
    typeIsObject,
} from '@harlem/utilities';

import type {
    ChangeType,
    HistoryEventData,
    HistoryGroup,
    HistoryTriggerHandler,
    MutationTrace,
    Options,
} from './types';

export * from './types';

function getMutationGroups(mutations: Options['mutations']) {
    const hasGroups = typeIsObject(mutations) && 'groups' in mutations;
    const groups = hasGroups ? mutations.groups : {};

    if (!hasGroups || typeIsMatchable(mutations)) {
        groups[DEFAULT_GROUP_KEY] = mutations;
    }

    return Object.entries(groups)
        .map(([key, matcher]) => {
            const matchable = typeIsMatchable(matcher) ? matcher : {
                include: matcher,
            };

            return {
                key,
                filter: matchGetFilter(matchable),
            };
        });
}

export default function historyExtension<TState extends BaseState>(options?: Partial<Options>) {
    const _options = {
        max: 50,
        mutations: '*',
        ...options,
    };

    const groups = getMutationGroups(_options.mutations);
    const createTraceExtension = traceExtension<TState>({
        autoStart: false,
    });

    function mutationFilter(mutation: string) {
        return groups.some(({ filter }) => filter(mutation));
    }

    return (store: InternalStore<TState>) => {
        store.register('extensions', 'history', () => _options);
        store.register('history', 'groups', () => Object
            .entries(historyState.groups)
            .reduce((output, [key, { history, position }]) => {
                output[key] = {
                    history,
                    position,
                    canUndo: canUndo(key),
                    canRedo: canRedo(key),
                };

                return output;
            }, {} as Record<string, unknown>)
        );

        const {
            startTrace,
            stopTrace,
            onTraceResult,
        } = createTraceExtension(store);

        const createHistoryState = () => {
            const results: TraceResult<any>[] = [];
            const historyGroups = groups.reduce((out, { key }) => {
                out[key] = {
                    position: -1,
                    history: [],
                };

                return out;
            }, {} as Record<string, HistoryGroup>);

            return {
                results,
                groups: reactive(historyGroups),
            };
        };

        let historyState = createHistoryState();
        let trackingListener: Disposable | undefined;

        function startHistoryTracking() {
            trackingListener ??= store.on(CORE_EVENTS.mutation.before, (event?: EventPayload<TriggerEventData>) => {
                if (!event || MUTATION_FILTER.test(event.data.name) || !mutationFilter(event.data.name)) {
                    return;
                }

                startTrace([
                    'set',
                    'deleteProperty',
                ]);

                const listener = onTraceResult(result => {
                    if (trackingListener) {
                        historyState.results.push(result);
                    }
                });

                store.once(CORE_EVENTS.mutation.after, () => {
                    stopTrace();
                    processResults(event.data.name);

                    listener.dispose();
                });
            });
        }

        function stopHistoryTracking() {
            trackingListener = trackingListener?.dispose() || undefined;
        }

        function skipHistoryTracking<TResult = void>(callback: () => TResult) {
            stopHistoryTracking();

            try {
                return callback();
            } finally {
                startHistoryTracking();
            }
        }

        function applyChange(type: ChangeType, change: MutationTrace) {
            store.write(`extension:history:${type}`, SENDER, state => {
                const tasks = CHANGE_MAP[type];
                const results = type === 'redo'
                    ? change.results
                    : change.results.slice().reverse();

                results.forEach(({ gate, nodes, prop, newValue, oldValue }) => {
                    const target = objectFromPath(state, nodes);

                    if (target && prop) {
                        tasks[gate]?.(target, prop, newValue, oldValue);
                    }
                });
            });
        }

        function processResults(mutation: string) {
            if (historyState.results.length === 0) {
                return;
            }

            for (const { key, filter } of groups) {
                if (!filter(mutation)) {
                    continue;
                }

                const historyGroup = historyState.groups[key];

                if (historyGroup.history.length - 1 !== historyGroup.position) {
                    historyGroup.history = historyGroup.history.slice(0, historyGroup.position + 1);
                }

                if (historyGroup.history.length >= _options.max) {
                    historyGroup.history.shift();
                }

                historyGroup.history.push(markRaw({
                    name: mutation,
                    results: Array.from(historyState.results),
                }));

                historyGroup.position = historyGroup.history.length - 1;
            }

            historyState.results = [];
        }

        function getChange(group: HistoryGroup, type: ChangeType) {
            const offset = TYPE_OFFSET[type];
            const changeIndex = group.position + (offset === -1 ? 0 : 1);
            const change = group.history[changeIndex];

            return {
                offset,
                change,
            };
        }

        function canChange(groupKey: string, type: ChangeType) {
            const group = historyState.groups[groupKey];
            return !!(group && getChange(group, type).change);
        }

        function run(groupKey: string, type: ChangeType) {
            const group = historyState.groups[groupKey];

            if (!group) {
                return;
            }

            const {
                offset,
                change,
            } = getChange(group, type);

            if (!change) {
                return;
            }

            const trigger = (event: string, payload?: unknown) => store.emit(event, SENDER, {
                group: groupKey,
                type,
                payload,
            });

            trigger(EVENTS.change.before);

            try {
                applyChange(type, change);
                trigger(EVENTS.change.success);
            } catch (error) {
                trigger(EVENTS.change.error);
            } finally {
                trigger(EVENTS.change.after);
            }

            group.position = numberClamp(group.position + offset, -1, group.history.length - 1);
        }

        function undo(group: string = DEFAULT_GROUP_KEY) {
            run(group, 'undo');
        }

        function redo(group: string = DEFAULT_GROUP_KEY) {
            run(group, 'redo');
        }

        function canUndo(group: string = DEFAULT_GROUP_KEY) {
            return canChange(group, 'undo');
        }

        function canRedo(group: string = DEFAULT_GROUP_KEY) {
            return canChange(group, 'redo');
        }

        function clearHistory() {
            historyState = createHistoryState();
        }

        const getTrigger = (eventName: string) => {
            return (handler: HistoryTriggerHandler, type?: ChangeType) => store.on(eventName, (event?: EventPayload<HistoryEventData>) => {
                if (event && (!type || type === event.data.type)) {
                    handler(event.data);
                }
            });
        };

        const onBeforeHistoryChange = getTrigger(EVENTS.change.before);
        const onAfterHistoryChange = getTrigger(EVENTS.change.after);
        const onHistoryChangeSuccess = getTrigger(EVENTS.change.success);
        const onHistoryChangeError = getTrigger(EVENTS.change.error);

        startHistoryTracking();

        return {
            undo,
            redo,
            canUndo,
            canRedo,
            clearHistory,
            startHistoryTracking,
            stopHistoryTracking,
            skipHistoryTracking,
            onBeforeHistoryChange,
            onAfterHistoryChange,
            onHistoryChangeSuccess,
            onHistoryChangeError,
        };
    };
}