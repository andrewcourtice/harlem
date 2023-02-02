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
} from '@harlem/utilities';

import type {
    ChangeType,
    HistoryChange,
    HistoryCommand,
    Options,
} from './types';

export * from './types';

function getOptions(options?: Partial<Options>): Options {
    return {
        max: 50,
        command: [],
        ...options,
    };
}

export default function historyExtension<TState extends BaseState>(options?: Partial<Options>) {
    const _options = getOptions(options);

    const commands = ([] as HistoryCommand[])
        .concat(_options.command)
        .map(command => {
            const mutationFilter = matchGetFilter(command);

            return {
                ...command,
                mutationFilter,
            };
        });

    function commandsMutationFilter(mutation: string): boolean {
        return commands.some(command => command.mutationFilter(mutation));
    }

    const createTraceExtension = traceExtension<TState>({
        autoStart: true,
    });

    return (store: InternalStore<TState>) => {
        store.register('extensions', 'history', () => _options);

        const {
            startTrace,
            stopTrace,
            onTraceResult,
        } = createTraceExtension(store);

        type State = {
            position: number;
            changes: HistoryChange[];
            results: TraceResult<any>[];
        };

        const historyState: State = {
            position: 0,
            changes: [],
            results: [],
        };

        store.on(EVENTS.mutation.before, (event?: EventPayload<TriggerEventData>) => {
            if (!event || MUTATION_FILTER.test(event.data.name) || commandsMutationFilter(event.data.name)) {
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

        function applyChange(type: ChangeType, change: HistoryChange) {
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

            if (historyState.changes.length >= _options.max) {
                historyState.changes.shift();
            }

            historyState.changes.push({
                mutation,
                results: Array.from(historyState.results),
            });

            historyState.results = [];
            historyState.position = historyState.changes.length - 1;
        }

        function run(type: ChangeType, offset: number) {
            const changeIndex = historyState.position + (offset === 1 ? 1 : 0);
            const change = historyState.changes[changeIndex];

            if (!change) {
                return;
            }

            applyChange(type, change);
            historyState.position = Math.max(0, Math.min(historyState.changes.length - 1, historyState.position + offset));
        }

        function undo() {
            run('undo', -1);
        }

        function redo() {
            run('exec', 1);
        }

        function clearHistory() {
            historyState.position = 0;
            historyState.changes = [];
            historyState.results = [];
        }

        return {
            undo,
            redo,
            clearHistory,
        };
    };
}