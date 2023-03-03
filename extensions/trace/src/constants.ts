import type {
    TagStyleOptions,
    TraceGate,
} from './types';

export const TAG_STYLE = {
    foreground: '#FFFFFF',
    background: '#6B7280',
};

export const GATE_TAG_STYLE = {
    get: {
        background: '#22C55E',
    },
    set: {
        background: '#3B82F6',
    },
    deleteProperty: {
        background: '#EF4444',
    },
} as Record<TraceGate<any>, Partial<TagStyleOptions>>;