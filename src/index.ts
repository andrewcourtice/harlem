import Registration from './registration';

import {
    computed,
    reactive,
    readonly,
} from 'vue';

import type {
    Getter,
    Mutator,
    ReadState,
    Store,
    StoreMethods,
    WriteState
} from './interfaces';

const stores = new Map<string, Registration>();

function getCoreMethods<T>(storeName: string, read: ReadState<T>, write: WriteState<T>, registration: Registration<T>): StoreMethods<T> {
    const getter = <U>(name: string, getter: Getter<T, U>) => {
        registration.registerGetter(name);
        return computed(() => getter(read));
    };
    
    const mutation = <U>(name: string, mutator: Mutator<T, U>) => {
        registration.registerMutation(name);

        return (payload?: U) => {
            try {
                mutator(write, payload);
            } catch (error) {
                registration.log('error', name, payload);
            }
    
            registration.log('mutation', name, payload);
        }
    };

    return {
        getter,
        mutation
    };
}

export function createStore<T extends object = any>(name: string, data: T): Store<T> {
    const write = reactive(data) as WriteState<T>;
    const state = readonly(write) as ReadState<T>;

    const registration = new Registration(name, state);

    const {
        getter,
        mutation
    } = getCoreMethods(name, state, write, registration);

    function destroy() {
        stores.delete(name);
    }

    stores.set(name, registration);
    
    return {
        state,
        getter,
        mutation,
        destroy
    };
}

const {
    getter,
    mutation
} = createStore('thing', {
    a: 1,
    b: 2,
    c: {
        something: 'Hello'
    }
});

const g = getter('thing', state => state.b);
const m = mutation<number>('thing', (state, payload) => {
    if (payload) {
        state.a = payload;
    }
});

m()