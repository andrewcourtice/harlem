import getType from './get-type';

export default function isArray(value: unknown): value is unknown[] {
    return getType(value) === 'array';
}