import type {
    App,
    ComputedRef,
    DeepReadonly,
} from 'vue';

type UnionToIntersection<U> = (U extends any ? (arg: U) => any : never) extends ((arg: infer I) => void) ? I : never;

export type BaseState = object;
export type StoreProvider<TState extends BaseState> = keyof StoreProviders<TState>;
export type ReadState<TState extends BaseState> = DeepReadonly<TState>;
export type WriteState<TState extends BaseState> = TState;
export type Getter<TState extends BaseState, TResult> = (state: ReadState<TState>) => TResult;
export type Mutator<TState extends BaseState, TPayload, TResult = void> = (state: WriteState<TState>, payload: TPayload) => TResult;
export type Mutation<TPayload, TResult = void> = undefined extends TPayload ? (payload?: TPayload) => TResult : (payload: TPayload) => TResult;
export type InternalStores = Map<string, InternalStore<any>>;
export type EventHandler<TData = any> = (payload?: EventPayload<TData>) => void;
export type MutationHookHandler<TPayload, TResult> = (data: MutationEventData<TPayload, TResult>) => void;
export type Extension<TState extends BaseState> = (store: InternalStore<TState>) => Record<string, any>;
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
}

export interface MutationEventData<TPayload = any, TResult = any> {
    mutation: string;
    payload: TPayload;
    result?: TResult;
}

export interface StoreBase<TState extends BaseState> {
    getter<TResult>(name: string, getter: Getter<TState, TResult>): ComputedRef<TResult>;
    mutation<TPayload, TResult = void>(name: string, mutator: Mutator<TState, TPayload, TResult>): Mutation<TPayload, TResult>;
}

export interface StoreProviders<TState extends BaseState> {
    read(state: ReadState<TState>): ReadState<TState>;
    write(state: WriteState<TState>): WriteState<TState>;
    payload<TPayload>(payload: TPayload): TPayload;
}

export interface InternalStore<TState extends BaseState = any> extends StoreBase<TState> {
    readonly allowsOverwrite: boolean;
    readonly providers: StoreProviders<TState>;
    readonly state: ReadState<TState>;
    name: string;
    registrations: StoreRegistrations;
    hasRegistration(type: string, name: string): boolean;
    getRegistration(type: string, name: string): RegistrationValueProducer | undefined;
    register(type: string, name: string, valueProducer: RegistrationValueProducer): void;
    unregister(type: string, name: string): void;
    emit(event: string, sender: string, data: any): void;
    on(event: string, handler: EventHandler): EventListener;
    once(event: string, handler: EventHandler): EventListener
    exec<TResult = void>(name: string, payload?: any): TResult;
    track<TResult>(callback: () => TResult): TResult;
    provider<TKey extends StoreProvider<TState>>(key: TKey, value: StoreProviders<TState>[TKey]): void;
    write<TResult = void>(name: string, sender: string, mutator: Mutator<TState, undefined, TResult>): TResult;
    destroy(): void;
}

export interface InternalStoreOptions<TState extends BaseState> {
    allowOverwrite: boolean;
    providers: Partial<StoreProviders<TState>>;
}

export interface StoreOptions<TState extends BaseState, TExtensions extends Extension<TState>[]> extends InternalStoreOptions<TState> {
    extensions?: TExtensions;
}

export interface Store<TState extends BaseState> extends StoreBase<TState> {
    state: ReadState<TState>;
    on(event: string, handler: EventHandler): EventListener;
    once(event: string, handler: EventHandler): EventListener;
    destroy(): void;
    onBeforeMutation<TPayload = any, TResult = any>(mutationName: string | string[], handler: MutationHookHandler<TPayload, TResult>): EventListener;
    onAfterMutation<TPayload = any, TResult = any>(mutationName: string | string[], handler: MutationHookHandler<TPayload, TResult>): EventListener;
    onMutationError<TPayload = any, TResult = any>(mutationName: string | string[], handler: MutationHookHandler<TPayload, TResult>): EventListener;
}

export interface HarlemPlugin {
    name: string;
    install(app: App, eventEmitter: Emittable, stores: InternalStores): void;
}

export interface PluginOptions {
    plugins?: HarlemPlugin[];
}

export type RegistrationValueProducer = () => unknown;

export interface StoreRegistrations {
    [key: string]: Map<string, RegistrationValueProducer>;
    getters: Map<string, RegistrationValueProducer>;
    mutations: Map<string, RegistrationValueProducer>;
}
