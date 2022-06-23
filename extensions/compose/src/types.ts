import type {
    DeepReadonly,
} from 'vue';

import type {
    EventListener,
} from '@harlem/core';

export type Accessor<TState, TValue> = (state: TState) => TValue;
export type Producer<TState, TValue> = (state: DeepReadonly<TState>) => TValue;
export type Getter<TValue> = () => DeepReadonly<TValue>;
export type Setter<TValue> = (value: TValue | Producer<TValue, TValue>) => void;
export type ListenersAccessor = EventListener | EventListener[] | (() => EventListener | EventListener[]);