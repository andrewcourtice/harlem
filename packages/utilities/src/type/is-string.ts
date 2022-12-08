import getType from './get-type';

export default function isString(value: unknown): value is string {
    return getType(value) === 'string';
}