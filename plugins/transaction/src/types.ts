export type Transactor<TPayload> = undefined extends TPayload ? (payload?: TPayload) => void : (payload: TPayload) => void;
export type Transaction<TPayload> = (payload?: TPayload) => void;
export type TransactionRollback = () => void;

export interface TransactionEventData {
    transaction: string;
    payload: any;
}