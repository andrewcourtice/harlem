import getType from './get-type';

export default function isObject(value: unknown): value is object {
    return getType(value) === 'object';
}