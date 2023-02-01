import type {
    ChangeType,
    CommandTasks,
} from './types';

export const SENDER = 'extension:history';
export const MUTATION_FILTER = /^(plugin|extension)/;

export const CHANGE_MAP = {
    exec: {
        set: (target, prop, newValue) => target[prop] = newValue,
        deleteProperty: (target, prop) => delete target[prop],
    },
    undo: {
        set: (target, prop, newValue, oldValue) => target[prop] = oldValue,
        deleteProperty: (target, prop, newValue, oldValue) => target[prop] = oldValue,
    },
} as Record<ChangeType, Partial<CommandTasks>>;