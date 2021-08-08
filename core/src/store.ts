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
    clone,
} from '@harlem/utilities';

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
    RegistrationType,
    StoreRegistration,
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
                payload: value => clone(value),
                ...options?.providers,
            },
        };

        this.name = name;
        this.registrations = {};
        this.stack = new Set();
        this.scope = effectScope();
        this.writeState = reactive(state) as WriteState<TState>;
        this.readState = readonly(this.writeState) as ReadState<TState>;
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
        if (!this.scope.active) {
            return;
        }

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

    public hasRegistration(group: string, name: string): boolean {
        return !!this.registrations[group]?.has(name);
    }

    public getRegistration(group: string, name: string): StoreRegistration | undefined {
        return this.registrations[group]?.get(name);
    }

    public register(group: string, name: string, producer: RegistrationValueProducer, type: RegistrationType = 'other'): void {
        if (!(group in this.registrations)) {
            this.registrations[group] = new Map();
        }

        if (!this.allowsOverwrite && this.hasRegistration(group, name)) {
            throw new Error(`A ${group} named ${name} has already been registered on this store`);
        }

        this.registrations[group].set(name, {
            type,
            producer,
        });
    }

    public unregister(group: string, name: string): void {
        this.registrations[group]?.delete(name);
    }

    public getter<TResult>(name: string, getter: Getter<TState, TResult>): ComputedRef<TResult> {
        const output = this.track(() => computed(() => getter(this.state)));

        this.register('getters', name, () => output.value, 'computed');

        return output;
    }

    private mutate<TPayload, TResult = void>(name: string, sender: string, mutator: Mutator<TState, TPayload, TResult>, payload: TPayload): TResult {
        if (!this.scope.active) {
            throw new Error('The current store has been destroyed. Mutations can no longer take place.');
        }

        if (this.stack.has(name)) {
            throw new Error('Circular mutation reference detected. Avoid calling mutations inside other mutations to prevent circular references.');
        }

        let result: TResult;

        const eventData: MutationEventData<TPayload, TResult> = {
            payload,
            mutation: name,
        };

        const emitComplete = (event: string) => this.emit(event, sender, {
            ...eventData,
            result,
        });

        this.stack.add(name);
        this.emit(EVENTS.mutation.before, sender, eventData);

        try {
            const providedState = this.providers.write(this.writeState) ?? this.writeState;
            const providedPayload = this.providers.payload(payload) ?? payload;

            result = mutator(providedState, providedPayload);
        } catch (error) {
            this.emit(EVENTS.mutation.error, sender, eventData);
            throw error;
        } finally {
            this.stack.delete(name);
            emitComplete(EVENTS.mutation.after);
        }

        emitComplete(EVENTS.mutation.success);

        return result;
    }

    public mutation<TPayload, TResult = void>(name: string, mutator: Mutator<TState, TPayload, TResult>): Mutation<TPayload, TResult> {
        const mutation = ((payload: TPayload) => {
            return this.mutate(name, SENDER, mutator, payload);
        }) as Mutation<TPayload, TResult>;

        this.register('mutations', name, () => mutation);

        return mutation;
    }

    public write<TResult = void>(name: string, sender: string, mutator: Mutator<TState, undefined, TResult>): TResult {
        return this.mutate(name, sender, mutator, undefined);
    }

    public destroy(): void {
        this.scope.stop();
    }

}