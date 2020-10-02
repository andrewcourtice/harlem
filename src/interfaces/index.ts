import type {
    App,
    UnwrapRef,
    ComputedRef,
    DeepReadonly
} from 'vue';

import type {
    EventEmitter
} from '../event-emitter';

export type ReadState<T> = DeepReadonly<T>;
export type WriteState<T> = UnwrapRef<T>;
export type Getter<T, U> = (state: ReadState<T>) => U;
export type Mutator<T, U> = (state: WriteState<T>, payload?: U) => void;
export type Mutation<T> = (payload?: T) => void;
export type RegistrationEvent = 'getter' | 'mutation' | 'error';

export interface EventListener {
    dispose(): void
}

export interface HarlemPlugin {
    name: string;
    install(app: App, eventEmitter: EventEmitter): void;
}

export interface PluginOptions {
    plugins?: HarlemPlugin[]
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
    on(event: string, handler: Function): EventListener;
};