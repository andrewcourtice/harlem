import type {
    WriteState,
    BaseState,
} from '@harlem/core';

export type BranchCallback<TState extends BaseState> = ((state: WriteState<TState>) => BaseState) | undefined;