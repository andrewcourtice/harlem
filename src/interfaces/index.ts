import type {
    UnwrapRef,
    ComputedRef,
    DeepReadonly
} from 'vue';

export type ReadState<T> = DeepReadonly<T>;
export type WriteState<T> = UnwrapRef<T>;
export type Getter<T, U> = (state: ReadState<T>) => U;
export type Mutator<T, U> = (state: WriteState<T>, payload?: U) => void;
export type Mutation<T> = (payload?: T) => void;
export type RegistrationEvent = 'mutation' | 'error';

export interface EventListener {
    dispose(): void
}

export interface StoreRegistration<T> {
    state(): ReadState<T>,
    getters: Set<string>,
    mutations: Set<string>
}

export interface StoreMethods<T> {
    getter<U>(name: string, getter: Getter<T, U>): ComputedRef<U>;
    mutation<U>(name: string, mutator: Mutator<T, U>): Mutation<U>;
}

export interface Store<T> extends StoreMethods<T> {
    state: ReadState<T>;
    destroy(): void;
};