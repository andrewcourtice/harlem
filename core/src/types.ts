import {
    App,
    ComputedRef,
    DeepReadonly,
    Plugin,
} from 'vue';

import type {
    Disposable,
    Matchable,
    Matcher,
    UnionToIntersection,
} from '@harlem/utilities';

declare global {
    interface Window {
        $harlem: {
            createInstance(): HarlemInstance;
        };
    }
}

export type BaseState = Record<PropertyKey, any>;
export type StoreProducer<TState extends BaseState> = keyof StoreProducers<TState>;
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
export type Trigger = <TPayload = any, TResult = any>(matcher: Matcher | Matchable, handler: TriggerHandler<TPayload, TResult>) => Disposable;
export type TriggerHandler<TPayload = any, TResult = any> = (data: TriggerEventData<TPayload, TResult>) => void;
export type BranchAccessor<TState extends BaseState, TValue> = (state: ReadState<TState>) => TValue;
export type InternalStores = Map<string, InternalStore<BaseState>>;
export type HarlemPlugin = (app: App, eventBus: EventBus, stores: InternalStores) => void;
export type Extension<TState extends BaseState> = (store: InternalStore<TState>) => Record<string, any>;
export type ExtensionAPIs<TExtensions extends Extension<BaseState>[]> = Record<string, any> extends UnionToIntersection<ReturnType<TExtensions[number]>> ? unknown : UnionToIntersection<ReturnType<TExtensions[number]>>;
export type PublicStore<TState extends BaseState, TExtensions extends Extension<TState>[]> = Omit<Store<TState>, keyof ExtensionAPIs<TExtensions>> & ExtensionAPIs<TExtensions>;

export interface StoreRegistration {
    type: RegistrationType;
    producer: RegistrationValueProducer;
}

export interface EventBus {
    /**
     * Subscribe to an event.
     *
     * @param event - The name of the event to subscribe to
     * @param handler - A handler called when the event is fired
     */
    on(event: string, handler: EventHandler): Disposable;

    /**
     * Subscribe to an event. Once the event is fired once, this listener is automatically detached.
     *
     * @param event - The name of the event to subscribe to
     * @param handler - A handler called when the event is fired
     */
    once(event: string, handler: EventHandler): Disposable;

    /**
     * Unsubscribe from an event.
     *
     * @param event - The name of the event to unsubscribe from
     * @param handler - The handler the was registered to the event
     */
    off(event: string, handler: EventHandler): void;

    /**
     * Publish an event.
     *
     * @param event - The name of the event to publish
     * @param payload - An optional payload to publish with the event
     */
    emit(event: string, payload?: EventPayload): void;
}

export interface EventPayload<TData = any> {
    /**
     * The name of the event sender. This could be the core library, any registered extension/plugin, or user-emitted events.
     */
    sender: string;

    /**
     * The store on which this event took place.
     */
    store: string;

    /**
     * A payload sent along with the event.
     */
    data: TData;
}

export interface TriggerEventData<TPayload = any, TResult = any> {
    /**
     * The name of the mutation/action that fired this trigger.
     */
    name: string;

    /**
     * The payload provided to the mutation/action that fired this trigger.
     */
    payload: TPayload;

    /**
     * The result returned from the mutation/action that fired this trigger. This is only populated for after and success triggers.
     */
    result?: TResult;
}

export interface StoreSnapshot<TState extends BaseState> {
    /**
     * A readonly copy of state in the snapshot
    */
    get state(): TState;

    /**
     * Apply the current snapshot's state to the store. This will essentially overwrite any changes to state since this snapshot was taken.
     * @param branchAccessor - An optional branch accessor to apply a partial part of this snapshot to the store.
     * @param mutationName - An optional mutation name to use when applying the snapshot. This is useful for identifying snapshot applications in the Harlem devtools.
     */
    apply<TValue>(branchAccessor?: BranchAccessor<TState, TValue>, mutationName?: string): void;
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
    on(event: string, handler: EventHandler): Disposable;

    /**
     * Listen to an event on this store (only executed once)
     *
     * @param event - The name of the event to listen to
     * @param handler - The handler that will be called when the event is triggered
     */
    once(event: string, handler: EventHandler): Disposable;

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
    reset<TValue>(branchAccessor?: BranchAccessor<TState, TValue>): void;

    /**
     * Destroy this store
     */
    destroy(): void;
}

export interface StoreProducers<TState extends BaseState> {
    /**
     * The provider used when exposing writable state
     *
     * @param state - The writable state object
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

export interface InternalStore<TState extends BaseState = BaseState> extends StoreBase<TState> {
    /**
     * The name of this store
     */
    readonly name: string;

    /**
     * A boolean indicating whether this store allows overwriting duplicate registrations
     */
    readonly allowsOverwrite: boolean;

    /**
     * The current (readonly) state object
     */
    readonly state: ReadState<TState>;

    /**
     * Flags defined on this store
     */
    readonly flags: Map<string, unknown>;

    /**
     * The producers for this store
     */
    readonly producers: StoreProducers<TState>;

    /**
     * The items registered with this store
     */
    readonly registrations: StoreRegistrations;

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
    allowsOverwrite: boolean;

    /**
     * A set of providers used by this store
     */
    producers: Partial<StoreProducers<TState>>;
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
     * The trigger called before a mutation runs
     */
    onBeforeMutation: Trigger;

    /**
     * The trigger called after a mutation runs, regardless of it was successful or not
     */
    onAfterMutation: Trigger;

    /**
     * The trigger called upon successful completion of a mutation
     */
    onMutationSuccess: Trigger;

    /**
     * The trigger called when a mutation fails
     */
    onMutationError: Trigger;

    /**
     * The trigger called before an action runs
     */
    onBeforeAction: Trigger;

    /**
     * The trigger called after an action runs, regardless of it was successful or not
     */
    onAfterAction: Trigger;

    /**
     * The trigger called upon successful completion of an action
     */
    onActionSuccess: Trigger;

    /**
     * The trigger called when an action fails
     */
    onActionError: Trigger;
}

export interface HarlemOptions {
    /**
     * An optional array of plugins to register with Harlem
     */
    plugins?: HarlemPlugin[];
}

export interface HarlemInstance extends Omit<EventBus, 'emit'> {
    /**
     * Attach Harlem to a Vue application. This is required for Harlem plugins to be usable.
     *
     * @param app - The Vue application instance to attach to
     * @param options - Harlem options
     */
    createVuePlugin(options?: HarlemOptions): Plugin;

    /**
     * Create a new Harlem store.
     *
     * @param name - The name of this store.
     * @param state - The initial state of this store.
     * @param options - Additional options used to configure this store.
     *
     * @example
     * // Define the initial state of this store
     * const STATE = {
     *     firstName: 'John',
     *     lastName: 'Smith'
     * };
     *
     * // Create the store with the initial state and any options/extensions
     * const {
     *     state,
     *     getter,
     *     mutation,
     *     action
     * } = createStore('app', STATE, {
     *     extensions: [
     *         actionExtension()
     *     ]
     * })
     */
    createStore<TState extends BaseState, TExtensions extends Extension<TState>[]>(
        name: string,
        state: TState,
        options?: Partial<StoreOptions<TState, TExtensions>>
    ): PublicStore<TState, TExtensions>;
}