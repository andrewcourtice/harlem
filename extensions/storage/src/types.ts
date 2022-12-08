import type {
    BaseState,
    BranchAccessor,
    ReadState,
} from '@harlem/core';

import type {
    Matchable,
} from '@harlem/utilities';

export type StorageType = 'local' | 'session';

export interface Options<TState extends BaseState> extends Matchable {
    type: StorageType;
    prefix: string;
    sync: boolean;
    restore: boolean;
    serialiser(state: ReadState<TState>): string;
    parser(value: string): TState;
    branch: BranchAccessor<TState, unknown>;
}