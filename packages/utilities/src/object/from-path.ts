import isArray from '../type/is-array';

export default function fromPath<TValue extends object>(value: TValue, path: string | PropertyKey[]): object | undefined {
    const nodes = isArray(path) ? path : path.split('/');
    return nodes.reduce((branch, node) => (branch as any)?.[node], value);
}