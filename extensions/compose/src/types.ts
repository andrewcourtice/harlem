import { DeepReadonly } from "vue";

export type Accessor<TState, TValue> = (state: TState) => TValue;
export type Getter<TValue> = () => DeepReadonly<TValue>;
export interface Setter<TValue> {
  (value: TValue): void;
  (callback: (value: DeepReadonly<TValue>) => TValue): void;
}
