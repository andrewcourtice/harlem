import eventEmitter from './event-emitter';

import {
    EVENTS,
    SENDER,
} from './constants';

import {
    reactive,
    readonly,
    computed,
    effectScope,
    ComputedRef,
    EffectScope,
} from 'vue';

import {
    raiseOverwriteError,
} from './utilities';

import type {
    BaseState,
    EventHandler,
    EventListener,
    EventPayload,
    Getter,
    InternalStore,
    InternalStoreOptions,
    Mutation,
    MutationEventData,
    Mutator,
    ReadState,
    WriteState,
    StoreProvider,
    StoreProviders,
    StoreRegistrations,
    RegistrationValueProducer,
} from './types';

function localiseHandler(name: string, handler: EventHandler): EventHandler {
    return payload => {
        if (payload && payload.store === name) {
            handler(payload);
        }
    };
}

export default class Store<TState extends BaseState = any> implements InternalStore<TState> {

    private options: InternalStoreOptions<TState>;
    private scope: EffectScope;
    private stack: Set<string>;
    private readState: ReadState<TState>;
    private writeState: WriteState<TState>;

    public name: string;
    public registrations: StoreRegistrations;

    constructor(name: string, state: TState, options?: Partial<InternalStoreOptions<TState>>) {
        this.options = {
            allowOverwrite: true,
            ...options,

            providers: {
                read: value => value,
                write: value => value,
                payload: value => value,
                ...options?.providers,
            },
        };

        this.name = name;
        this.stack = new Set();
        this.scope = effectScope();
        this.writeState = reactive(state) as WriteState<TState>;
        this.readState = readonly(this.writeState) as ReadState<TState>;

        this.registrations = {
            getters: new Map(),
            mutations: new Map(),
        };
    }

    public get allowsOverwrite(): boolean {
        return this.options.allowOverwrite;
    }

    public get providers(): StoreProviders<TState> {
        return {
            read: value => value,
            write: value => value,
            payload: value => value,
            ...this.options.providers,
        };
    }

    public get state(): ReadState<TState> {
        return this.providers.read(this.readState) ?? this.readState;
    }

    public emit(event: string, sender: string, data: any): void {
        const payload: EventPayload = {
            data,
            sender,
            store: this.name,
        };

        eventEmitter.emit(event, payload);
    }

    public on(event: string, handler: EventHandler): EventListener {
        return eventEmitter.on(event, localiseHandler(this.name, handler));
    }

    public once(event: string, handler: EventHandler): EventListener {
        return eventEmitter.once(event, localiseHandler(this.name, handler));
    }

    public provider<TKey extends StoreProvider<TState>>(key: TKey, value: StoreProviders<TState>[TKey]): void {
        this.options.providers[key] = value;
    }

    public track<TResult>(callback: () => TResult): TResult {
        return this.scope.run(callback)!;
    }

    public hasRegistration(type: string, name: string): boolean {
        return !!this.registrations[type]?.has(name);
    }

    public getRegistration(type: string, name: string): RegistrationValueProducer | undefined {
        return this.registrations[type]?.get(name);
    }

    public register(type: string, name: string, valueProducer: RegistrationValueProducer): void {
        if (!(type in this.registrations)) {
            this.registrations[type] = new Map();
        }

        this.registrations[type].set(name, valueProducer);
    }

    public unregister(type: string, name: string): void {
        this.registrations[type]?.delete(name);
    }

    public getter<TResult>(name: string, getter: Getter<TState, TResult>): ComputedRef<TResult> {
        if (!this.allowsOverwrite && this.hasRegistration('getters', name)) {
            raiseOverwriteError('getter', name);
        }

        const output = this.track(() => computed(() => getter(this.state)));

        this.register('getters', name, () => output.value);

        return output;
    }

    private mutate<TPayload, TResult = void>(name: string, sender: string, mutator: Mutator<TState, TPayload, TResult>, payload: TPayload): TResult {
        if (this.stack.has(name)) {
            throw new Error('Circular mutation reference detected. Avoid calling mutations inside other mutations to prevent circular references.');
        }

        const eventData: MutationEventData<TPayload, TResult> = {
            payload,
            mutation: name,
        };

        let result: TResult;

        this.stack.add(name);
        this.emit(EVENTS.mutation.before, sender, eventData);

        try {
            const _state = this.providers.write(this.writeState) ?? this.writeState;
            const _payload = this.providers.payload(payload) ?? payload;

            result = mutator(_state, _payload);
        } catch (error) {
            this.emit(EVENTS.mutation.error, sender, eventData);
            throw error;
        } finally {
            this.stack.delete(name);
        }

        this.emit(EVENTS.mutation.after, sender, {
            ...eventData,
            result,
        });

        return result;
    }

    public mutation<TPayload, TResult = void>(name: string, mutator: Mutator<TState, TPayload, TResult>): Mutation<TPayload, TResult> {
        if (!this.allowsOverwrite && this.hasRegistration('mutations', name)) {
            raiseOverwriteError('mutation', name);
        }

        const mutation = ((payload: TPayload) => {
            return this.mutate(name, SENDER, mutator, payload);
        }) as Mutation<TPayload, TResult>;

        this.register('mutations', name, () => mutation);

        return mutation;
    }

    public exec<TResult = void>(name: string, payload?: any): TResult {
        const mutation = this.getRegistration('mutations', name) as Mutation<any, TResult>;

        if (!mutation) {
            throw new Error(`No mutation found for ${name}`);
        }

        return mutation(payload);
    }

    public write<TResult = void>(name: string, sender: string, mutator: Mutator<TState, undefined, TResult>): TResult {
        return this.mutate(name, sender, mutator, undefined);
    }

    public destroy(): void {
        this.scope.stop();
    }

}