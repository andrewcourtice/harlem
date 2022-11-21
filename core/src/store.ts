import {
    EVENTS,
    MUTATIONS,
    PRODUCERS,
    SENDER,
} from './constants';

import {
    computed,
    ComputedRef,
    effectScope,
    reactive,
    readonly,
} from 'vue';

import {
    functionIdentity,
    objectClone,
    objectFromPath,
    objectSet,
    objectTrace,
} from '@harlem/utilities';

import type {
    Action,
    ActionBody,
    BaseState,
    BranchAccessor,
    EventBus,
    EventHandler,
    EventPayload,
    Getter,
    InternalStore,
    InternalStoreOptions,
    Mutation,
    Mutator,
    ReadState,
    RegistrationType,
    RegistrationValueProducer,
    StoreRegistration,
    StoreRegistrations,
    StoreSnapshot,
    TriggerEventData,
    WriteState,
} from './types';

// This is required as Vue removed the public `active` property from the EffectScope type
declare module 'vue' {
    interface EffectScope {
        active: boolean;
    }
}

function localiseHandler(name: string, handler: EventHandler): EventHandler {
    return payload => {
        if (payload && payload.store === name) {
            handler(payload);
        }
    };
}

export default function createInternalStore<TState extends BaseState = BaseState>(
    name: string,
    initialState: TState,
    eventBus: EventBus,
    options?: Partial<InternalStoreOptions<TState>>
): InternalStore<TState> {
    const {
        allowsOverwrite,
        producers,
    } = {
        allowsOverwrite: true,
        ...options,

        producers: {
            ...PRODUCERS,
            ...options?.producers,
        },
    };

    const registrations: StoreRegistrations = {};
    const flags = new Map<string, unknown>();
    const scope = effectScope();
    const stack = new Set<string>();let isSuppressing = false;
    const writeState = reactive(initialState) as WriteState<TState>;
    const readState = readonly(writeState) as ReadState<TState>;

    let resetSnapshot: StoreSnapshot<TState> | undefined;

    function emit(event: string, sender: string, data: any) {
        if (!scope.active || isSuppressing) {
            return;
        }

        const payload: EventPayload = {
            data,
            sender,
            store: name,
        };

        eventBus.emit(event, payload);
    }

    function on(event: string, handler: EventHandler) {
        return eventBus.on(event, localiseHandler(name, handler));
    }

    function once(event: string, handler: EventHandler) {
        return eventBus.once(event, localiseHandler(name, handler));
    }

    function track<TResult>(callback: () => TResult): TResult {
        return scope.run(callback)!;
    }

    function hasRegistration(group: string, name: string): boolean {
        return !!registrations[group]?.has(name);
    }

    function getRegistration(group: string, name: string): StoreRegistration | undefined {
        return registrations[group]?.get(name);
    }

    function register(group: string, name: string, producer: RegistrationValueProducer, type: RegistrationType = 'other'): void {
        if (!name) {
            throw new Error('Registration name cannot be empty');
        }

        if (!(group in registrations)) {
            registrations[group] = new Map();
        }

        if (!allowsOverwrite && hasRegistration(group, name)) {
            throw new Error(`A ${group} named ${name} has already been registered on this store`);
        }

        registrations[group].set(name, {
            type,
            producer,
        });
    }

    function unregister(group: string, name: string): void {
        registrations[group]?.delete(name);
    }

    function suppress<TResult = void>(callback: () => TResult): TResult {
        isSuppressing = true;

        try {
            return callback();
        } finally {
            isSuppressing = false;
        }
    }

    function getter<TResult>(name: string, getter: Getter<TState, TResult>): ComputedRef<TResult> {
        const output = track(() => computed(() => getter(readState)));

        register('getters', name, () => output.value, 'computed');

        return output;
    }

    function mutate<TPayload, TResult = void>(name: string, sender: string, mutator: Mutator<TState, TPayload, TResult>, payload: TPayload): TResult {
        if (!scope.active) {
            throw new Error('The current store has been destroyed. Mutations can no longer take place.');
        }

        if (stack.has(name)) {
            throw new Error('Circular mutation reference detected. Avoid calling mutations inside other mutations to prevent circular references.');
        }

        stack.add(name);

        let result: TResult;

        const trigger = (event: string) => emit(event, sender, {
            name,
            payload,
            result,
        } as TriggerEventData<TPayload, TResult>);

        trigger(EVENTS.mutation.before);

        try {
            const producedState = producers.write(writeState) ?? writeState;
            const producedPayload = producers.payload(payload) ?? payload;

            result = mutator(producedState, producedPayload);

            trigger(EVENTS.mutation.success);
        } catch (error) {
            trigger(EVENTS.mutation.error);
            throw error;
        } finally {
            stack.delete(name);
            trigger(EVENTS.mutation.after);
        }

        return result;
    }

    function mutation<TPayload, TResult = void>(name: string, mutator: Mutator<TState, TPayload, TResult>): Mutation<TPayload, TResult> {
        const mutation = ((payload: TPayload) => {
            return mutate(name, SENDER, mutator, payload);
        }) as Mutation<TPayload, TResult>;

        register('mutations', name, () => mutation);

        return mutation;
    }

    function action<TPayload, TResult = void>(name: string, body: ActionBody<TState, TPayload, TResult>): Action<TPayload, TResult> {
        const mutate = (mutator: Mutator<TState, undefined, void>) => write(name, SENDER, mutator);

        const action = (async (payload: TPayload) => {
            let result: TResult;

            const trigger = (event: string) => emit(event, SENDER, {
                name,
                payload,
                result,
            } as TriggerEventData);

            trigger(EVENTS.action.before);

            try {
                const producedPayload = producers.payload(payload) ?? payload;

                result = await body(producedPayload, mutate);
                trigger(EVENTS.action.success);
            } catch (error) {
                trigger(EVENTS.action.error);
                throw error;
            } finally {
                trigger(EVENTS.action.after);
            }

            return result;
        }) as Action<TPayload, TResult>;

        register('actions', name, () => action);

        return action;
    }

    function snapshot(): StoreSnapshot<TState> {
        const snapshot = objectClone(initialState);

        const {
            value,
            getNodes,
            resetNodes,
        } = objectTrace<ReadState<TState>>();

        const apply = <TValue>(
            branchAccessor: BranchAccessor<TState, TValue> = functionIdentity,
            mutationName: string = MUTATIONS.snapshot) => {
            write(mutationName, SENDER, state => {
                if (!snapshot) {
                    return console.warn('Couldn\'t find snapshot for this operation!');
                }

                resetNodes();
                branchAccessor(value);

                const nodes = getNodes();
                const source = objectFromPath(snapshot, nodes);

                objectSet(state, nodes, objectClone(source));
            });
        };

        return {
            apply,
            get state() {
                return objectClone(snapshot);
            },
        };
    }

    function reset<TBranchState extends BaseState>(branchAccessor: BranchAccessor<TState, TBranchState> = functionIdentity) {
        resetSnapshot?.apply(branchAccessor, MUTATIONS.reset);
    }

    function write<TResult = void>(name: string, sender: string, mutator: Mutator<TState, undefined, TResult>, suppressEvent?: boolean): TResult {
        const mutation = () => mutate(name, sender, mutator, undefined);

        return suppressEvent
            ? suppress(mutation)
            : mutation();
    }

    function destroy(): void {
        scope.stop();
    }

    once(EVENTS.store.ready, () => resetSnapshot = snapshot());
    on(EVENTS.devtools.reset, () => reset());

    const state = producers.read(readState) ?? readState;

    return {
        name,
        allowsOverwrite,
        flags,
        producers,
        registrations,

        on,
        once,
        emit,

        state,
        getter,
        mutation,
        action,
        write,
        snapshot,
        reset,

        register,
        unregister,
        hasRegistration,
        getRegistration,
        track,
        suppress,

        destroy,
    };
}