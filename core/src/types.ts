import type {
    App,
    UnwrapRef,
    ComputedRef,
    DeepReadonly
} from 'vue';

export type ReadState<T> = DeepReadonly<T>;
export type WriteState<T> = UnwrapRef<T>;
export type Getter<T, U> = (state: ReadState<T>) => U;
export type Mutator<T, U> = (state: WriteState<T>, payload?: U) => void;
export type Mutation<T> = (payload?: T) => void;
export type InternalStores = Map<string, InternalStore<any>>;
export type StoreEvent = 'mutation' | 'error';
export type EventHandler<T = any> = (payload: EventPayload<T>) => void;

export interface Emittable {
    on(event: string, handler: EventHandler): EventListener;
    once(event: string, handler: EventHandler): EventListener;
    off(event: string, handler: EventHandler): void;
    emit(event: string, payload: EventPayload): void;
}

export interface EventListener {
    dispose(): void
}

export interface EventPayload<T = any> {
    sender: string;
    store: string;
    data: T
};

export interface MutationEventData {
    mutation: string;
    payload: any
};

export interface StoreBase<T> {
    getter<U>(name: string, getter: Getter<T, U>): ComputedRef<U>;
    mutation<U>(name: string, mutator: Mutator<T, U>): Mutation<U>;
}

export interface InternalStore<T = any> extends StoreBase<T> {
    readonly state: ReadState<T>;
    name: string;
    getters: Map<string, Function>;
    mutations: Set<string>;
    emit(event: StoreEvent, sender: string, data: any): void;
    exec(name: string, sender: string, mutator: Mutator<T, undefined>): void;
}

export interface Store<T> extends StoreBase<T> {
    state: ReadState<T>;
    on(event: StoreEvent, handler: EventHandler): EventListener;
    once(event: StoreEvent, handler: EventHandler): EventListener;
    destroy(): void;
};

export interface HarlemPlugin {
    name: string;
    install(app: App, eventEmitter: Emittable, stores: InternalStores): void;
}

export interface Options {
    plugins?: HarlemPlugin[];
}
