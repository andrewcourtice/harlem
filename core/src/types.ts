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
export type StoreRegistrations = Record<string, Map<string, StoreRegistration>>;
export type RegistrationType = 'ref' | 'reactive' | 'computed' | 'other';
export type RegistrationValueProducer = () => unknown;
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

export interface StoreRegistration {
    type: RegistrationType;
    producer: RegistrationValueProducer;
}

export interface StoreBase<TState extends BaseState> {
    /**
     * Register a getter on this store
     *
     * @param name - The name of this getter
     * @param getter - A function returning the computed value from state
     */
    getter<TResult>(name: string, getter: Getter<TState, TResult>): ComputedRef<TResult>;

    /**
     * Register a mutation on this store
     *
     * @param name - The name of this mutation
     * @param mutator - A function used to mutate state. This function receives state and a payload as it's parameters.
     */
    mutation<TPayload, TResult = void>(name: string, mutator: Mutator<TState, TPayload, TResult>): Mutation<TPayload, TResult>;

    /**
     * Listen to an event on this store. This is useful for creating triggers.
     *
     * @param event - The name of the event to listen to
     * @param handler - The handler that will be called when the event is triggered
     */
    on(event: string, handler: EventHandler): EventListener;

    /**
     * Listen to an event on this store (only executed once)
     *
     * @param event - The name of the event to listen to
     * @param handler - The handler that will be called when the event is triggered
     */
    once(event: string, handler: EventHandler): EventListener;

    /**
     * Suppress events emitted from this store for the duration of the function callback
     *
     * @param callback - A function during which all events will be suppressed on this store
     */
    suppress<TResult = void>(callback: () => TResult): TResult;

    /**
     * Destroy this store
     */
    destroy(): void;
}

export interface StoreProviders<TState extends BaseState> {
    /**
     * The provider used when exposing readonly state
     *
     * @param state - The readonly state object
     */
    read(state: ReadState<TState>): ReadState<TState>;

    /**
     * The provider used when exposing writable state
     *
     * @param state - The writable state object
     */
    write(state: WriteState<TState>): WriteState<TState>;

    /**
     * The provider used when exposing payloads to mutators
     *
     * @param payload - The payload supplied to the mutation (or requester)
     */
    payload<TPayload>(payload: TPayload): TPayload;
}

export interface InternalStore<TState extends BaseState = any> extends StoreBase<TState> {
    /**
     * A boolean indicating whether this store allows overwriting duplicate registrations
     */
    readonly allowsOverwrite: boolean;

    /**
     * A set of providers used by this store
     */
    readonly providers: StoreProviders<TState>;

    /**
     * The current (readonly) state object
     */
    readonly state: ReadState<TState>;

    /**
     * The name of this store
     */
    name: string;

    /**
     * A list of items registered on this store
     */
    registrations: StoreRegistrations;

    /**
     * Checks whether an item with the specified name is registered under the specified group on this store
     *
     * @param group - The group this item is registered under
     * @param name - The name of the registration
     */
    hasRegistration(group: string, name: string): boolean;

    /**
     * Gets a registered item with the specified name
     *
     * @param group - The group this item is registered under
     * @param name - The name of the registration
     */
    getRegistration(group: string, name: string): StoreRegistration | undefined;

    /**
     * Register a new item on this store
     *
     * @param group - The group this item will be registered under
     * @param name - The name of this registration
     * @param valueProducer - A function returning the value that represents this registration
     * @param type - The type of registration this is
     */
    register(group: string, name: string, valueProducer: RegistrationValueProducer, type?: RegistrationType): void;

    /**
     * Remove a registration from this store
     *
     * @param group - The group this item is registered under
     * @param name - The name of the registration
     */
    unregister(group: string, name: string): void;

    /**
     * Emit an event from this store
     *
     * @param event - The name of the event to emit
     * @param sender - The name of the sender
     * @param data - Any data to be emitted with this event
     */
    emit(event: string, sender: string, data: any): void;

    /**
     * Register reactive effects with this store to be disposed when the store is destroyed
     *
     * @param callback - A function during which reactive effects will be tracked
     */
    track<TResult>(callback: () => TResult): TResult;

    /**
     * Override the provider for the given key
     *
     * @param key - The key of the provider to override
     * @param value - The value of this provider
     */
    provider<TKey extends StoreProvider<TState>>(key: TKey, value: StoreProviders<TState>[TKey]): void;

    /**
     * Perform a write operation on this store
     *
     * @param name - The name that will be used for this mutation operation
     * @param sender - The sender of the mutation
     * @param mutator - A function which will be used to mutate state
     * @param suppress - A boolean indication whether to suppress events for this mutation
     */
    write<TResult = void>(name: string, sender: string, mutator: Mutator<TState, undefined, TResult>, suppress?: boolean): TResult;
}

export interface InternalStoreOptions<TState extends BaseState> {
    /**
     * A boolean indicating whether this store allows overwriting duplicate registrations
     */
    allowOverwrite: boolean;

    /**
     * A set of providers used by this store
     */
    providers: Partial<StoreProviders<TState>>;
}

export interface StoreOptions<TState extends BaseState, TExtensions extends Extension<TState>[]> extends InternalStoreOptions<TState> {
    /**
     * An optional array of extensions to extend this store with
     */
    extensions?: TExtensions;
}

export interface Store<TState extends BaseState> extends StoreBase<TState> {
    /**
     * The current (readonly) state object
     */
    state: ReadState<TState>;

    /**
     * A convenience method to register triggers for before mutation events
     *
     * @param mutationName - The name(s) of the mutation(s) to listen to
     * @param handler - The handler that will be called when this event is triggered
     */
    onBeforeMutation<TPayload = any, TResult = any>(mutationName: string | string[], handler: MutationHookHandler<TPayload, TResult>): EventListener;

    /**
     * A convenience method to register triggers for after mutation events
     *
     * @param mutationName - The name(s) of the mutation(s) to listen to
     * @param handler - The handler that will be called when this event is triggered
     */
    onAfterMutation<TPayload = any, TResult = any>(mutationName: string | string[], handler: MutationHookHandler<TPayload, TResult>): EventListener;

    /**
     * A convenience method to register triggers for mutation success events
     *
     * @param mutationName - The name(s) of the mutation(s) to listen to
     * @param handler - The handler that will be called when this event is triggered
     */
    onMutationSuccess<TPayload = any, TResult = any>(mutationName: string | string[], handler: MutationHookHandler<TPayload, TResult>): EventListener;

    /**
     * A convenience method to register triggers for mutation error events
     *
     * @param mutationName - The name(s) of the mutation(s) to listen to
     * @param handler - The handler that will be called when this event is triggered
     */
    onMutationError<TPayload = any, TResult = any>(mutationName: string | string[], handler: MutationHookHandler<TPayload, TResult>): EventListener;
}

export interface HarlemPlugin {
    /**
     * The name of this plugin
     */
    name: string;

    /**
     * The install function that will be called when this plugin is registered with Harlem
     *
     * @param app - The current Vue app instance
     * @param eventEmitter - The event emitter used by Harlem for dispatching events
     * @param stores - A map of registered store
     */
    install(app: App, eventEmitter: Emittable, stores: InternalStores): void;
}

export interface PluginOptions {
    /**
     * An optional array of plugins to register with Harlem
     */
    plugins?: HarlemPlugin[];
}