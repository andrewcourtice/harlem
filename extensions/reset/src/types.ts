import {
    BaseState,
    ReadState,
    WriteState,
} from '@harlem/core';

export type BranchCallback<TState extends BaseState, TData extends BaseState> = (state: ReadState<TState> | WriteState<TState>) => TData;
