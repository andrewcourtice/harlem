import {
    NOTHING,
} from '@harlem/extension-trace';

import {
    typeIsAny,
    typeIsArray,
} from '@harlem/utilities';

import type {
    ChangeCommands,
    ChangeType,
} from './types';

export const SENDER = 'extension:history';
export const MUTATION_FILTER = /^(plugin|extension)/;
export const DEFAULT_GROUP_KEY = 'default';

export const TYPE_OFFSET: Record<ChangeType, number> = {
    undo: -1,
    redo: 1,
};

export const CHANGE_MAP: Record<ChangeType, Partial<ChangeCommands>> = {
    redo: {
        set: (target, prop, newValue) => target[prop] = newValue,
        deleteProperty: (target, prop) => delete target[prop],
    },
    undo: {
        set: (target, prop, newValue, oldValue) => {
            if (oldValue !== NOTHING) {
                return target[prop] = oldValue;
            }

            (typeIsArray(target) && typeIsAny(prop, ['number', 'string']))
                ? target.splice(+prop, 1)
                : delete target[prop];
        },
        deleteProperty: (target, prop, newValue, oldValue) => target[prop] = oldValue,
    },
};

export const EVENTS = {
    change: {
        before: 'history:change:before',
        after: 'history:change:after',
        success: 'history:change:success',
        error: 'history:change:error',
    },
} as const;