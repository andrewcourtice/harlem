import type {
    CommandType,
    CommandTasks,
} from './types';

export const SENDER = 'extension:history';

export const COMMAND_MAP = {
    exec: {
        set: (target, prop, newValue) => target[prop] = newValue,
        deleteProperty: (target, prop) => delete target[prop],
    },
    undo: {
        set: (target, prop, newValue, oldValue) => target[prop] = oldValue,
        deleteProperty: (target, prop, newValue, oldValue) => target[prop] = oldValue,
    },
} as Record<CommandType, Partial<CommandTasks>>;