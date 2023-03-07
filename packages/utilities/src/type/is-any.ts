import {
    RuntimeType,
    RuntimeTypeMap,
} from '../types';

import getType from './get-type';

export default function typeIsAny<TType extends RuntimeType>(value: unknown, types: TType[]): value is RuntimeTypeMap[TType] {
    return types.includes(getType(value) as TType);
}