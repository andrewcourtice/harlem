import type {
    App,
    ComputedRef,
    DeepReadonly
} from 'vue';

type UnionToIntersection<U> = (U extends any ? (arg: U) => any : never) extends ((arg: infer I) => void) ? I : never;

export type ReadState<TState> = DeepReadonly<TState>;
export type WriteState<TState> = TState;
export type Getter<TState, TResult> = (state: ReadState<TState>) => TResult;
export type Mutator<TState, TPayload, TResult = void> = (state: WriteState<TState>, payload: TPayload) => TResult;
export type Mutation<TPayload, TResult = void> = undefined extends TPayload ? (payload?: TPayload) => TResult : (payload: TPayload) => TResult;
export type InternalStores = Map<string, InternalStore<any>>;
export type EventHandler<TData = any> = (payload?: EventPayload<TData>) => void;
export type MutationHookHandler<TPayload, TResult> = (data: MutationEventData<TPayload, TResult>) => void;
export type Extension<TState> = (store: InternalStore<TState>) => Record<string, any>;
export type ExtendedStore<TExtensions extends Extension<any>[]> = UnionToIntersection<ReturnType<TExtensions[number]>>;

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
    readonly allowsOverwrite: boolean;
    readonly state: ReadState<TState>;
    name: string;
    getters: Map<string, Function>;
    mutations: Map<string, Mutator<TState, any, any>>;
    emit(event: string, sender: string, data: any): void;
    exec<TResult = void>(name: string, payload?: any): TResult;
    write<TResult = void>(name: string, sender: string, mutator: Mutator<TState, undefined, TResult>): TResult;
}

export interface InternalStoreOptions {
    allowOverwrite: boolean;
}

export interface StoreOptions<TState, TExtensions extends Extension<TState>[]> extends InternalStoreOptions {
    extensions?: TExtensions;
}

export interface Store<TState> extends StoreBase<TState> {
    state: ReadState<TState>;
    on(event: string, handler: EventHandler): EventListener;
    once(event: string, handler: EventHandler): EventListener;
    destroy(): void;
    onBeforeMutation<TPayload = any, TResult = any>(mutationName: string | string[], handler: MutationHookHandler<TPayload, TResult>): EventListener;
    onAfterMutation<TPayload = any, TResult = any>(mutationName: string | string[], handler: MutationHookHandler<TPayload, TResult>): EventListener;
    onMutationError<TPayload = any, TResult = any>(mutationName: string | string[], handler: MutationHookHandler<TPayload, TResult>): EventListener;
};

export interface HarlemPlugin {
    name: string;
    install(app: App, eventEmitter: Emittable, stores: InternalStores): void;
}

export interface PluginOptions {
    plugins?: HarlemPlugin[];
}
