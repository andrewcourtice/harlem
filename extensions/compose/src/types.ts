import { DeepReadonly } from '@vue/reactivity';

export type Accessor<TState, TValue> = (state: TState) => TValue;
export type Getter<TValue> = () => DeepReadonly<TValue>;
export type Setter<TValue> = (value: TValue) => void;