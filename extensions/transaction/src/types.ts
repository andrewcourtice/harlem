import type {
    BaseState,
    Mutator,
} from '@harlem/core';

export type Transactor<TState extends BaseState, TPayload = undefined> = (payload: TPayload, mutator: (mutate: Mutator<TState, undefined, void>) => void) => void;
export type Transaction<TPayload> = undefined extends TPayload ? (payload?: TPayload) => void : (payload: TPayload) => void;
export type TransactionHookHandler<TPayload> = (data: TransactionEventData<TPayload>) => void;

export interface TransactionEventData<TPayload = any> {
    transaction: string;
    payload: TPayload;
}