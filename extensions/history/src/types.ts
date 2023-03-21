import type {
    TraceGate,
    TraceResult,
} from '@harlem/extension-trace';

import type {
    Matchable,
} from '@harlem/utilities';

export type ChangeType = 'redo' | 'undo';
export type ChangeCommand = (target: any, prop: PropertyKey, newValue: unknown, oldValue: unknown) => void;
export type ChangeCommands = Record<TraceGate<any>, ChangeCommand>;

export type HistoryTriggerHandler = (data: HistoryEventData) => void;

export type HistoryItem = {
    id: symbol;
    label: string;
    mutation: string;
    payload?: unknown;
    results: TraceResult<any>[];
};

export type HistoryGroup = {
    position: number;
    history: HistoryItem[];
}

export interface HistoryEntryOptions extends Partial<Matchable> {
    label: string;
    group?: string;
    merge?: boolean | ((mutation: string, payload: unknown, prevMutation: string, prevPayload: unknown) => boolean);
}

export interface Options {
    max: number;
    entries: HistoryEntryOptions[];
}

export interface HistoryEventData<TPayload = unknown> {
    type: ChangeType;
    group: string;
    name: string;
    payload: TPayload;
}