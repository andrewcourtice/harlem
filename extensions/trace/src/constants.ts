import type {
    TraceGate,
} from './types';

export const GATE_COLOUR = {
    default: {
        foreground: '#FFFFFF',
        background: '#6B7280',
    },
    get: {
        foreground: '#FFFFFF',
        background: '#10B981',
    },
    set: {
        foreground: '#FFFFFF',
        background: '#3B82F6',
    },
    deleteProperty: {
        foreground: '#FFFFFF',
        background: '#EF4444',
    },
} as Record<TraceGate<any> | 'default', {
    foreground: string;
    background: string;
}>;