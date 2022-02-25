import getType from './get-type';

export default function isObject(value: unknown): value is Function {
    return getType(value) === 'function';
}