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

export default class Store<T extends object = any> implements InternalStore<T> {

    private name: string;
    private read: ReadState<T>;
    private write: WriteState<T>;

    public getters: Map<string, Function>;
    public mutations: Set<string>;

    constructor(name: string, state: T) {
        this.name = name;
        this.write = reactive(state) as WriteState<T>;
        this.read = readonly(this.write) as ReadState<T>;

        this.getters = new Map();
        this.mutations = new Set();
    }

    public get state(): ReadState<T> {
        return this.read;
    }

    public getter<U>(name: string, getter: Getter<T, U>): ComputedRef<U> {
        if (this.getters.has(name)) {
            throw new Error(`A getter named: ${name} has already been registered.`);
        }

        const output = computed(() => getter(this.state));

        this.getters.set(name, () => output.value);
        
        return output;
    };

    public mutation<U>(name: string, mutator: Mutator<T, U>): Mutation<U> {
        if (this.mutations.has(name)) {
            throw new Error(`A mutation named: ${name} has already been registered.`);
        }
    
        this.mutations.add(name);

        return (payload?: U) => {
            const eventData: MutationEventData = {
                payload,
                mutation: name
            };

            try {
                mutator(this.write, payload);
            } catch (error) {
                this.emit('error', eventData);
            }
            
            this.emit('mutation', eventData);
        };
    }

    public emit(event: StoreEvent, data: any): void {
        const payload: EventPayload = {
            data,
            sender: 'core',
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

}