export const SENDER = 'extension:action';

export const EVENTS = {
    action: {
        before: 'action:before',
        after: 'action:after',
        success: 'action:success',
        error: 'action:error',
    },
} as const;