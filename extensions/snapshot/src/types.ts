import type {
    BaseState,
    ReadState,
    WriteState,
} from '@harlem/core';

export type BranchCallback<TState extends BaseState, TData extends BaseState> = (state: ReadState<TState> | WriteState<TState>) => TData;

export interface Options {
    mutationName: string;
}

export interface Snapshot<TState> {
    state: Readonly<TState>;
    apply(): void;
}