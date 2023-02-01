import type {
    TraceGate,
    TraceResult,
} from '@harlem/extension-trace';

import type {
    Matcher,
    OneOrMore,
} from '@harlem/utilities';

export type ChangeType = 'exec' | 'undo';
export type CommandTask = (target: any, prop: PropertyKey, newValue: unknown, oldValue: unknown) => void;
export type CommandTasks = Record<TraceGate<any>, CommandTask>;

export type HistoryChange = {
    mutation: string;
    results: TraceResult<any>[];
};

export type HistoryCommand = {
    batch?: boolean;
    label: string | ((numBatched: number) => string);
    include?: Matcher;
    exclude?: Matcher;
}

export type Options = {
    max: number;
    command: OneOrMore<HistoryCommand>;
}