import eventEmitter from './event-emitter';

import {
    EVENTS,
    SENDER
} from './constants';

import {
    reactive,
    readonly,
    computed,
    ComputedRef
} from 'vue';

import {
    raiseOverwriteError
} from './utilities';

import type {
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
    WriteState
} from './types';

function localiseHandler(name: string, handler: EventHandler): EventHandler {
    return payload => {
        if (payload && payload.store === name) {
            handler(payload);
        }
    };
}

export default class Store<TState extends object = any> implements InternalStore<TState> {

    private options: InternalStoreOptions;
    private readState: ReadState<TState>;
    private writeState: WriteState<TState>;

    public name: string;
    public getters: Map<string, Function>;
    public mutations: Map<string, Mutation<any>>;

    constructor(name: string, state: TState, options?: Partial<InternalStoreOptions>) {
        this.options = {
            allowOverwrite: true,
            ...options
        };

        this.writeState = reactive(state) as WriteState<TState>;
        this.readState = readonly(this.writeState) as ReadState<TState>;
        
        this.name = name;
        this.getters = new Map();
        this.mutations = new Map();
    }

    public get allowsOverwrite(): boolean {
        return this.options.allowOverwrite;
    }

    public get state(): ReadState<TState> {
        return this.readState;
    }

    public emit(event: string, sender: string, data: any): void {
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

    public getter<TResult>(name: string, getter: Getter<TState, TResult>): ComputedRef<TResult> {
        if (!this.allowsOverwrite && this.getters.has(name)) {
            raiseOverwriteError('getter', name);
        }

        const output = computed(() => getter(this.state));

        this.getters.set(name, () => output.value);
        
        return output;
    };

    private mutate<TPayload, TResult = void>(name: string, sender: string, mutator: Mutator<TState, TPayload, TResult>, payload: TPayload): TResult {
        const eventData: MutationEventData<TPayload, TResult> = {
            payload,
            mutation: name
        };

        let result: TResult;

        this.emit(EVENTS.mutation.before, sender, eventData);

        try {
            result = mutator(this.writeState, payload);
        } catch (error) {
            this.emit(EVENTS.mutation.error, sender, eventData);
            throw error;
        }

        this.emit(EVENTS.mutation.after, sender, {
            ...eventData,
            result
        });

        return result;
    }

    public mutation<TPayload, TResult = void>(name: string, mutator: Mutator<TState, TPayload, TResult>): Mutation<TPayload, TResult> {
        if (!this.allowsOverwrite && this.mutations.has(name)) {
            raiseOverwriteError('mutation', name);
        }

        const mutation = ((payload: TPayload) => {
            return this.mutate(name, SENDER, mutator, payload);
        }) as Mutation<TPayload, TResult>;
        
        this.mutations.set(name, mutation);
        
        return mutation;
    }

    public exec<TResult = void>(name: string, payload?: any): TResult {
        const mutation = this.mutations.get(name) as Mutation<any, TResult>;

        if (!mutation) {
            throw new Error(`No mutation found for ${name}`);
        }

        return mutation(payload);
    }
    
    public write<TResult = void>(name: string, sender: string, mutator: Mutator<TState, undefined, TResult>): TResult {
        return this.mutate(name, sender, mutator, undefined);
    }

}