import getType from './get-type';

export default function isBoolean(value: unknown): value is boolean {
    return getType(value) === 'boolean';
}