import {
    TraceGate,
    TraceResult,
} from '@harlem/extension-trace';

export type CommandType = 'exec' | 'undo';
export type CommandTask = (target: any, prop: PropertyKey, newValue: unknown, oldValue: unknown) => void;
export type CommandTasks = Record<TraceGate<any>, CommandTask>;

export interface MutationPayload {
    type: CommandType;
    command: HistoryCommand;
}

export interface HistoryCommand {
    name: string;
    results: TraceResult<any>[];
}

export interface HistoryMutation {
    name: string;
    description?: string;
}

export interface Options {
    max: number;
    mutations: HistoryMutation[];
}