import {
    CHANGE_MAP,
    MUTATION_FILTER,
    SENDER,
} from './constants';

import {
    BaseState,
    EventPayload,
    EVENTS,
    InternalStore,
    TriggerEventData,
} from '@harlem/core';

import traceExtension, {
    TraceResult,
} from '@harlem/extension-trace';

import {
    matchGetFilter,
    objectFromPath,
    typeIsMatchable,
    typeIsObject,
} from '@harlem/utilities';

import type {
    ChangeType,
    HistoryGroup,
    MutationTrace,
    Options,
} from './types';

export * from './types';

function getOptions(options?: Partial<Options>): Options {
    return {
        max: 50,
        mutations: '*',
        ...options,
    };
}

export default function historyExtension<TState extends BaseState>(options?: Partial<Options>) {
    const _options = getOptions(options);
    const groups = getMutationGroups(_options.mutations);

    const createTraceExtension = traceExtension<TState>({
        autoStart: true,
    });

    function mutationFilter(mutation: string) {
        return groups.some(({ filter }) => filter(mutation));
    }

    return (store: InternalStore<TState>) => {
        store.register('extensions', 'history', () => _options);

        const {
            startTrace,
            stopTrace,
            onTraceResult,
        } = createTraceExtension(store);

        const createHistoryState = () => {
            const results: TraceResult<any>[] = [];
            const historyGroups = groups.reduce((out, { key }) => {
                out[key] = {
                    position: 0,
                    history: [],
                };

                return out;
            }, {} as Record<string, HistoryGroup>);

            return {
                results,
                groups: historyGroups,
            };
        };

        let historyState = createHistoryState();

        store.on(EVENTS.mutation.before, (event?: EventPayload<TriggerEventData>) => {
            if (!event || MUTATION_FILTER.test(event.data.name) || !mutationFilter(event.data.name)) {
                return;
            }

            startTrace([
                'set',
                'deleteProperty',
            ]);

            const listener = onTraceResult(result => historyState.results.push(result));

            store.once(EVENTS.mutation.after, () => {
                stopTrace();
                processResults(event.data.name);

                listener.dispose();
            });
        });

        function applyChange(type: ChangeType, change: MutationTrace) {
            store.write(`extension:history:${type}`, SENDER, state => {
                const tasks = CHANGE_MAP[type];
                const results = type === 'exec'
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

                if (historyGroup.history.length >= _options.max) {
                    historyGroup.history.shift();
                }

                historyGroup.history.push({
                    name: mutation,
                    results: Array.from(historyState.results),
                });

                historyGroup.position = historyGroup.history.length - 1;
            }

            historyState.results = [];
        }

        function run(groupKey: string, type: ChangeType, offset: number) {
            const historyGroup = historyState.groups[groupKey];

            if (!historyGroup) {
                return;
            }

            const changeIndex = historyGroup.position + (offset === 1 ? 1 : 0);
            const change = historyGroup.history[changeIndex];

            if (!change) {
                return;
            }

            applyChange(type, change);
            historyGroup.position = Math.max(0, Math.min(historyGroup.history.length - 1, historyGroup.position + offset));
        }

        function undo(group: string = '') {
            run(group, 'undo', -1);
        }

        function redo(group: string = '') {
            run(group, 'exec', 1);
        }

        function clearHistory() {
            historyState = createHistoryState();
        }

        return {
            undo,
            redo,
            clearHistory,
        };
    };
}

function getMutationGroups(mutations: Options['mutations']) {
    const hasGroups = typeIsObject(mutations) && 'groups' in mutations;
    const groups = hasGroups ? mutations.groups : {};

    if (!hasGroups || typeIsMatchable(mutations)) {
        groups[''] = mutations;
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