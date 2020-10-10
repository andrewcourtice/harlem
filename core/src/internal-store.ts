import eventEmitter from './event-emitter';

import {
    reactive,
    readonly,
    computed,
    ComputedRef
} from 'vue';

import type {
    EventHandler,
    EventListener,
    EventPayload,
    Getter,
    InternalStore,
    Mutation,
    MutationEventData,
    Mutator,
    ReadState,
    StoreEvent,
    WriteState
} from './types';

function localiseHandler(name: string, handler: EventHandler): EventHandler {
    return (payload: EventPayload) => {
        if (payload.store === name) {
            handler(payload);
        }
    };
}

function raiseDuplicationError(type: string, name: string): void {
    throw new Error(`A ${type} named ${name} has already been registered on this store.`);
}

export default class Store<T extends object = any> implements InternalStore<T> {

    private read: ReadState<T>;
    private write: WriteState<T>;

    public name: string;
    public getters: Map<string, Function>;
    public mutations: Set<string>;

    constructor(name: string, state: T) {
        this.write = reactive(state) as WriteState<T>;
        this.read = readonly(this.write) as ReadState<T>;
        
        this.name = name;
        this.getters = new Map();
        this.mutations = new Set();
    }

    public get state(): ReadState<T> {
        return this.read;
    }

    public emit(event: StoreEvent, sender: string, data: any): void {
        const payload: EventPayload = {
            data,
            sender,
            store: this.name
        };

        eventEmitter.emit(event, payload);
    }

    public on(event: string, handler: EventHandler): EventListener {
        return eventEmitter.on(event, localiseHandler(this.name, handler));
    }
    
    public once(event: string, handler: EventHandler): EventListener {
        return eventEmitter.once(event, localiseHandler(this.name, handler));
    }

    public getter<U>(name: string, getter: Getter<T, U>): ComputedRef<U> {
        if (this.getters.has(name)) {
            raiseDuplicationError('getter', name);
        }

        const output = computed(() => getter(this.state));

        this.getters.set(name, () => output.value);
        
        return output;
    };

    private mutate<U>(name: string, sender: string, mutator: Mutator<T, U>, payload?: U): void {
        const eventData: MutationEventData = {
            payload,
            mutation: name
        };

        try {
            mutator(this.write, payload);
        } catch (error) {
            this.emit('error', sender, eventData);
        }

        this.emit('mutation', sender, eventData);
    }

    public mutation<U>(name: string, mutator: Mutator<T, U>): Mutation<U> {
        if (this.mutations.has(name)) {
            raiseDuplicationError('mutation', name);
        }
        
        this.mutations.add(name);
        
        return (payload?: U) => this.mutate(name, 'core', mutator, payload);
    }
    
    public exec(name: string, sender: string, mutator: Mutator<T, undefined>): void {
        this.mutate(name, sender, mutator);
    }

}