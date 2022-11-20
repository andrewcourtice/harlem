import type {
    DeepReadonly,
} from 'vue';

import type {
    Disposable,
} from '@harlem/utilities';

export type Accessor<TState, TValue> = (state: TState) => TValue;
export type Producer<TState, TValue> = (state: DeepReadonly<TState>) => TValue;
export type Getter<TValue> = () => DeepReadonly<TValue>;
export type Setter<TValue> = (value: TValue | Producer<TValue, TValue>) => void;
export type ListenersAccessor = Disposable | Disposable[] | (() => Disposable | Disposable[]);