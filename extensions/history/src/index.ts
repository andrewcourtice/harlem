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

        let position = 0;
        let changes: HistoryChange[] = [];
        let results: TraceResult<any>[] = [];

        function applyChange(type: ChangeType, change: HistoryChange) {
            store.write(`extension:history:${type}`, SENDER, state => {
                const tasks = CHANGE_MAP[type];

                let {
                    results,
                } = change;

                if (type === 'undo') {
                    results = results.slice().reverse();
                }

                results.forEach(({ gate, nodes, prop, newValue, oldValue }) => {
                    const target = objectFromPath(state, nodes);

                    if (target && prop) {
                        tasks[gate]?.(target, prop, newValue, oldValue);
                    }
                });
            });
        }

        function processResults(mutation: string) {
            if (results.length === 0) {
                return;
            }

            if (changes.length >= _options.max) {
                changes.shift();
            }

            changes.push({
                mutation,
                results: Array.from(results),
            });

            results = [];
            position = changes.length - 1;
        }

        store.on(EVENTS.mutation.before, (event?: EventPayload<TriggerEventData>) => {
            if (!event || MUTATION_FILTER.test(event.data.name) || commandsMutationFilter(event.data.name)) {
                return;
            }

            startTrace([
                'set',
                'deleteProperty',
            ]);

            const listener = onTraceResult(result => results.push(result));

            store.once(EVENTS.mutation.after, () => {
                stopTrace();
                processResults(event.data.name);

                listener.dispose();
            });
        });

        function run(type: ChangeType, offset: number) {
            const change = changes[position + Math.max(0, offset)];

            if (!change) {
                return;
            }

            applyChange(type, change);

            position = Math.max(0, Math.min(changes.length - 1, position + offset));
        }

        function undo() {
            run('undo', -1);
        }

        function redo() {
            run('exec', 1);
        }

        function clearHistory() {
            position = 0;
            changes = [];
            results = [];
        }

        return {
            undo,
            redo,
            clearHistory,
        };
    };
}