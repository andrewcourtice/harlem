export const SENDER = 'core';

export const EVENTS = {
    core: {
        installed: 'core:installed',
    },
    store: {
        created: 'store:created',
        destroyed: 'store:destroyed',
    },
    mutation: {
        before: 'mutation:before',
        after: 'mutation:after',
        success: 'mutation:success',
        error: 'mutation:error',
    },
    devtools: {
        update: 'devtools:update',
    },
};