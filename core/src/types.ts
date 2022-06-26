import type {
    App,
    ComputedRef,
    DeepReadonly,
} from 'vue';

type UnionToIntersection<TValue> = (TValue extends any ? (arg: TValue) => any : never) extends ((arg: infer I) => void) ? I : never;

//export type BaseState = object;
export type BaseState = Record<PropertyKey, any>;
export type StoreProvider<TState extends BaseState> = keyof StoreProviders<TState>;
export type ReadState<TState extends BaseState> = DeepReadonly<TState>;
export type WriteState<TState extends BaseState> = TState;
export type StoreRegistrations = Record<string, Map<string, StoreRegistration>>;
export type RegistrationType = 'ref' | 'reactive' | 'computed' | 'other';
export type RegistrationValueProducer = () => unknown;
export type Getter<TState extends BaseState, TResult> = (state: ReadState<TState>) => TResult;
export type Mutator<TState extends BaseState, TPayload, TResult = void> = (state: WriteState<TState>, payload: TPayload) => TResult;
export type Mutation<TPayload, TResult = void> = undefined extends TPayload ? (payload?: TPayload) => TResult : (payload: TPayload) => TResult;
export type ActionBody<TState extends BaseState, TPayload = undefined, TResult = void> = (payload: TPayload, mutator: (mutate: Mutator<TState, undefined, void>) => void) => Promise<TResult>;
export type Action<TPayload, TResult = void> = undefined extends TPayload ? (payload?: TPayload) => Promise<TResult> : (payload: TPayload) => Promise<TResult>;
export type EventHandler<TData = any> = (payload?: EventPayload<TData>) => void;
export type TriggerHandler<TEventData extends TriggerEventData> = (data: TEventData) => void;
export type Trigger<TEventData extends TriggerEventData> = (name: string | string[], handler: TriggerHandler<TEventData>) => EventListener;
export type BranchAccessor<TState extends BaseState, TBranchState extends BaseState> = (state: ReadState<TState> | WriteState<TState>) => TBranchState;
export type InternalStores = Map<string, InternalStore<any>>;
export type Extension<TState extends BaseState> = (store: InternalStore<TState>) => Record<string, any>;
export type ExtensionAPIs<TExtensions extends Extension<any>[]> = UnionToIntersection<ReturnType<TExtensions[number]>>;
export type PublicStore<TState extends BaseState, TExtensions extends Extension<TState>[]> = Store<TState> & ExtensionAPIs<TExtensions>;
// export type PublicStore<TState extends BaseState, TExtensions extends Extension<TState>[]> = Omit<Store<TState>, keyof ExtensionAPIs<TExtensions>> & ExtensionAPIs<TExtensions>

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

export interface TriggerEventData<TPayload = any, TResult = any> {
    payload: TPayload;
    result?: TResult;
}

export interface MutationEventData<TPayload = any, TResult = any> extends TriggerEventData<TPayload, TResult> {
    mutation: string;
}

export interface ActionEventData<TPayload = any, TResult = any> extends TriggerEventData<TPayload, TResult> {
    action: string;
}

export interface StoreRegistration {
    type: RegistrationType;
    producer: RegistrationValueProducer;
}

export interface StoreSnapshot<TState> {
    get state(): TState;
    apply<TBranchState extends BaseState>(branchCallback?: BranchAccessor<TState, TBranchState>, mutationName?: string): void;
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
     * Register an action on this store
     *
     * @param name - The name of this action
     * @param body - The function to execute as part of this action. This function receives a payload and mutator function as it's parameters.
     */
    action<TPayload, TResult = void>(name: string, body: ActionBody<TState, TPayload, TResult>): Action<TPayload, TResult>;

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
     * Take a snapshot of this store's current state
     */
    snapshot(): StoreSnapshot<TState>;

    /**
     * Reset this store back to it's intial state
     *
     * @param branchAccessor - An optional function that returns a sub-branch of state to reset
     */
    reset<TBranchState extends BaseState>(branchAccessor?: BranchAccessor<TState, TBranchState>): void;

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
     * Get a flag value on this store
     *
     * @param {string} key
     * @return {*}  {unknown}
     * @memberof InternalStore
     */
    getFlag(key: string): unknown;

    /**
     * Set a flag value on this store
     *
     * @param {string} key
     * @param {unknown} value
     * @memberof InternalStore
     */
    setFlag(key: string, value: unknown): void;

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

    onBeforeMutation: Trigger<MutationEventData>;
    onAfterMutation: Trigger<MutationEventData>;
    onMutationSuccess: Trigger<MutationEventData>;
    onMutationError: Trigger<MutationEventData>;
    onBeforeAction: Trigger<ActionEventData>;
    onAfterAction: Trigger<ActionEventData>;
    onActionSuccess: Trigger<ActionEventData>;
    onActionError: Trigger<ActionEventData>;
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