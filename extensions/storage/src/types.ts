import {
    BaseState,
    ReadState,
} from '@harlem/core';

export type StorageType = 'local' | 'session';

export interface Options<TState extends BaseState> {
    type: StorageType;
    prefix: string;
    sync: boolean;
    serialiser(state: ReadState<TState>): string;
    parser(value: string): TState;
}