import getType from './get-type';

// eslint-disable-next-line @typescript-eslint/ban-types
export default function isFunction(value: unknown): value is Function {
    return getType(value) === 'function';
}