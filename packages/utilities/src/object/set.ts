import fromPath from './from-path';
import isArray from '../type/is-array';
import isNil from '../type/is-nil';
import overwrite from './overwrite';

export default function setObjectValue<TTarget extends object>(target: TTarget, path: string | PropertyKey[], value: any) {
    const nodes = (isArray(path) ? path : path.split('/')).slice();
    const key = nodes.pop();

    if (isNil(key) || key === '') {
        return overwrite(target, value);
    }

    const parent = fromPath(target, nodes) as Record<PropertyKey, unknown>;
    parent[key] = value;
}