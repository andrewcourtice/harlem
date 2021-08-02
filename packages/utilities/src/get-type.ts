import type {
    RuntimeType,
} from './types';

export default function getType(input: unknown): RuntimeType {
    return Object.prototype.toString.call(input).slice(8, -1).toLowerCase() as RuntimeType;
}