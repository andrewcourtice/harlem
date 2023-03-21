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
    typeIsFunction,
} from '@harlem/utilities';

import type {
    ChangeType,
    HistoryEventData,
    HistoryGroup,
    HistoryItem,
    HistoryTriggerHandler,
    Options,
} from './types';

export * from './types';

export default function historyExtension<TState extends BaseState>(options?: Partial<Options>) {
    const _options = {
        max: 50,
        entries: [],
        ...options,
    };

    const createTraceExtension = traceExtension<TState>({
        autoStart: false,
    });

    return (store: InternalStore<TState>) => {
        store.register('extensions', 'history', () => _options);
        store.register('history', 'groups', () => Object
            .entries(groups)
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
            max,
            entries,
        } = {
            max: 50,
            entries: [],
            ...options,
        };

        const {
            startTrace,
            stopTrace,
            onTraceResult,
        } = createTraceExtension(store);

        const items = entries.map(({ group, merge, include, exclude, ...entry }) => ({
            ...entry,
            group: group || DEFAULT_GROUP_KEY,
            merge: typeIsFunction(merge) ? merge : () => !!merge,
            matcher: matchGetFilter({
                include,
                exclude,
            }),
        }));

        const groups = reactive(getGroups());
        let trackingListener: Disposable | undefined;

        function createGroupState() {
            return {
                position: -1,
                history: [],
            } as HistoryGroup;
        }

        function getGroups() {
            return items.reduce((output, { group }) => {
                return output.set(group, createGroupState());
            }, new Map<string, HistoryGroup>());
        }

        function processResults(event: EventPayload<TriggerEventData>, results: TraceResult<TState>[]) {
            const {
                name: mutation,
                payload,
            } = event.data;

            if (!results.length) {
                return;
            }

            groups.forEach((group, key) => {
                const item = getItem(mutation, key);

                if (!item) {
                    return;
                }

                if (group.history.length - 1 !== group.position) {
                    group.history = group.history.slice(0, group.position + 1);
                }

                if (group.history.length >= max) {
                    group.history.shift();
                }

                group.history.push(markRaw({
                    mutation,
                    payload,
                    id: Symbol(),
                    label: item.label,
                    results: Array.from(results),
                }));

                group.position = group.history.length - 1;
            });
        }

        function getItem(mutation: string, group?: string) {
            return items.find(item => (!group || item.group === group) && item.matcher(mutation));
        }

        function startHistoryTracking() {
            trackingListener ??= store.on(CORE_EVENTS.mutation.before, (event?: EventPayload<TriggerEventData>) => {
                if (!event || MUTATION_FILTER.test(event.data.name) || !getItem(event.data.name)) {
                    return;
                }

                startTrace([
                    'set',
                    'deleteProperty',
                ]);

                const results = [] as TraceResult<TState>[];
                const listener = onTraceResult(result => {
                    if (trackingListener) {
                        results.push(result);
                    }
                });

                store.once(CORE_EVENTS.mutation.after, () => {
                    stopTrace();
                    processResults(event, results);

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

        function applyChange(type: ChangeType, change: HistoryItem) {
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
            const group = groups.get(groupKey);
            return !!(group && getChange(group, type).change);
        }

        function run(groupKey: string, type: ChangeType) {
            const group = groups.get(groupKey);

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
                type,
                payload,
                group: groupKey,
                name: change.mutation,
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

        function clearHistory(group: string = DEFAULT_GROUP_KEY) {
            groups.set(group, createGroupState());
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