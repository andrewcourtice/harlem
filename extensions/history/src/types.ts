import type {
    TraceGate,
    TraceResult,
} from '@harlem/extension-trace';

import type {
    Matchable,
    Matcher,
} from '@harlem/utilities';

export type ChangeType = 'redo' | 'undo';
export type ChangeCommand = (target: any, prop: PropertyKey, newValue: unknown, oldValue: unknown) => void;
export type ChangeCommands = Record<TraceGate<any>, ChangeCommand>;

export type HistoryTriggerHandler = (data: HistoryEventData) => void;

export type MutationTrace = {
    name: string;
    results: TraceResult<any>[];
};

export type HistoryGroup = {
    position: number;
    history: MutationTrace[];
}

export type MutationGroups = {
    groups: Record<string, Matcher | Matchable>;
};

export type Options = {
    max: number;
    mutations: Matcher | Matchable | MutationGroups | Matchable & MutationGroups;
};

export interface HistoryEventData<TPayload = unknown> {
    group: string;
    type: ChangeType;
    payload: TPayload;
}