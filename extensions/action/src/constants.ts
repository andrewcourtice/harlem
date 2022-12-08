import {
    INTERNAL,
} from '@harlem/core';

export const SENDER = 'extension:action';
export const STATE_PROP = `${INTERNAL.prefix}actions` as const;

export const MUTATIONS = {
    init: 'extension:action:init',
    register: 'extension:action:register',
    incrementRunCount: 'extension:action:increment-run-count',
    addInstance: 'extension:action:add-instance',
    removeInstance: 'extension:action:remove-instance',
    addError: 'extension:action:add-error',
    clearErrors: 'extension:action:clear-errors',
    resetState: 'extension:action:reset-state',
} as const;