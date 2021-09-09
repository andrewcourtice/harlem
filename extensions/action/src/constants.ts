import {
    INTERNAL,
} from '@harlem/core';

export const SENDER = 'extension:action';
export const STATE_PROP = `${INTERNAL.prefix}actions` as const;

export const EVENTS = {
    action: {
        before: 'action:before',
        after: 'action:after',
        success: 'action:success',
        error: 'action:error',
    },
} as const;