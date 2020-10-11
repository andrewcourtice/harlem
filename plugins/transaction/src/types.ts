export type Transactor<T> = (payload?: T) => void;
export type Transaction<T> = (payload?: T) => void;
export type TransactionRollback = () => void;

export interface TransactionEventData {
    transaction: string;
    payload: any;
};