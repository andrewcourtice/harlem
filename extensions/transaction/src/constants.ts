export const SENDER = 'extension:transaction';

export const MUTATIONS = {
    rollback: 'extension:transaction:rollback',
} as const;

export const EVENTS = {
    transaction: {
        before: 'transaction:before',
        after: 'transaction:after',
        success: 'transaction:success',
        error: 'transaction:error',
    },
};