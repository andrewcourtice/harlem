import type {
    App,
    ComputedRef,
    DeepReadonly
} from 'vue';

export type ReadState<TState> = DeepReadonly<TState>;
export type WriteState<TState> = TState;
export type Getter<TState, TResult> = (state: ReadState<TState>) => TResult;
export type Mutator<TState, TPayload, TResult = void> = (state: WriteState<TState>, payload: TPayload) => TResult;
export type Mutation<TPayload, TResult = void> = undefined extends TPayload ? (payload?: TPayload) => TResult : (payload: TPayload) => TResult;
export type InternalStores = Map<string, InternalStore<any>>;
export type EventHandler<TData = any> = (payload?: EventPayload<TData>) => void;

export interface Emittable {
    on(event: string, handler: EventHandler): EventListener;
    once(event: string, handler: EventHandler): EventListener;
    off(event: string, handler: EventHandler): void;
    emit(event: string, payload?: EventPayload): void;
}

export interface EventListener {
    dispose(): void
}

export interface EventPayload<TData = any> {
    sender: string;
    store: string;
    data: TData;
};

export interface MutationEventData<TPayload = any, TResult = any> {
    mutation: string;
    payload: TPayload;
    result?: TResult;
};

export interface StoreBase<TState> {
    getter<TResult>(name: string, getter: Getter<TState, TResult>): ComputedRef<TResult>;
    mutation<TPayload, TResult = void>(name: string, mutator: Mutator<TState, TPayload, TResult>): Mutation<TPayload, TResult>;
}

export interface InternalStore<TState = any> extends StoreBase<TState> {
    readonly state: ReadState<TState>;
    name: string;
    getters: Map<string, Function>;
    mutations: Map<string, Mutator<TState, any, any>>;
    emit(event: string, sender: string, data: any): void;
    exec<TResult = void>(name: string, payload?: any): TResult;
    write<TResult = void>(name: string, sender: string, mutator: Mutator<TState, undefined, TResult>): TResult;
}

export interface Store<TState> extends StoreBase<TState> {
    state: ReadState<TState>;
    on(event: string, handler: EventHandler): EventListener;
    once(event: string, handler: EventHandler): EventListener;
    destroy(): void;
};

export interface HarlemPlugin {
    name: string;
    install(app: App, eventEmitter: Emittable, stores: InternalStores): void;
}

export interface Options {
    plugins?: HarlemPlugin[];
}
