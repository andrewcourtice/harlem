# Core Concepts

Harlem, much like Vuex, follows a Redux-like state management pattern. Harlem's functionality can be divided into 3 main concepts:
- State - The single source of truth for your data (read-only)
- Getters - Computed side-effects of mutations to state (read-only)
- Mutations - The means by which state is changed (read/write)

Where Harlem differs from Vuex is that as opposed to having one monolithic state tree, Harlem uses the concept of stores to create logical boundaries between disparate data.


## State

The state tree is the single source of truth for any given store. Once a store has been created, the state tree is strictly **readonly**. The initial state for a store is defined upon store creation.

### Defining State

```typescript
const STATE = {
    firstName: 'John',
    lastName: 'Smith'
};

const {
    state
} = createStore('user', STATE);

state.firstName = 'Jane'; // This will throw an error
```

### Usage in Components

```html
<template>
    <div class="app">
        <h1>Hello {{ state.firstName }}</h1>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

import {
    state
} from './stores/user';

export default defineComponent({

    setup() {
        return {
            state
        };
    }

});
</script>
```


## Getters

If you have used Vuex before you will likely be familiar with the concept of a `getter`. A `getter` is a computed store property that is automatically updated when state changes.

Getters are particularly useful for joining different parts of state together or mapping data. In Harlem getters are always **readonly**.

### Defining a Getter

To define a getter simply import the getter function returned from the `createStore` method. The getter function takes 2 arguments - a name, and a callback with a single `state` parameter.

```typescript
const STATE = {
    firstName: 'John',
    lastName: 'Smith'
};

const {
    getter
} = createStore('user', STATE);

export const fullName = getter('fullname', state => {
    return `${state.firstName} ${state.lastName}`;
});
```

The getter function returns a Vue computed property that can now be used in your components or even other getters.


### Usage in Components

```html
<template>
    <div class="app">
        <h1>Hello {{ fullName }}</h1>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed
} from 'vue';

import {
    fullName
} from './stores/user';

export default defineComponent({

    setup() {
        return {
            fullName
        };
    }

});
</script>
```


## Mutations

Mutations are the foundation of Harlem. A mutation is the only means by which state can be mutated. This is to ensure every change to state is predictable and auditable.

Mutations are simple functions that take a payload in, mutate state, and optionally return a result.

### Defining a Mutation

```typescript
const STATE = {
    name: 'John Smith',
    traits: []
};

const {
    mutation
} = createStore('user', STATE);

// This mutation takes a string payload and updates the name field
export const setName = mutation<string>('setName', (state, payload) => {
    state.firstName = payload;
});

// This mutation takes a string payload, adds a trait to the list and returns it's id
export const addTrait = mutation<string, symbol>('addTrait', (state, payload) => {
    const traitId = Symbol(payload);

    state.traits.push({
        id: traitId,
        value: payload
    });

    return traitId;
});

/*
Usage

setName('Jane Smith');

const traitId = addTrait('funny');
*/
```


### Usage in Components

```html
<template>
    <div class="app">
        <h1>Hello {{ name }}</h1>
        <input type="text" v-model="name" placeholder="Name">
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed
} from 'vue';

import {
    state,
    setName
} from './stores/user';

export default defineComponent({

    setup() {
        const name = computed({
            get: () => state.name,
            set: value => setName(value)
        });

        return {
            name
        };
    }

});
</script>
```


## Triggers

Triggers allow you to react to global or specific store events. Harlem uses an event-driven model to remain fast and lean while still providing flexible plugin hooks. The upside to this is that you can hook into specific Harlem events and react to them.

Triggers are particularly useful for reacting to certain mutations to perform async tasks. For instance, a trigger would allow you to send state back to a server after certain mutations.

### Store Triggers

```typescript
import {
    EVENTS,
    createStore
} from '@harlem/core';

const STATE = {
    firstName: 'John',
    lastName: 'Smith'
};

const {
    on,
    once
} = createStore('user', STATE);

on(EVENTS.mutation.before, event => console.log(event));
on(EVENTS.mutation.after, event => console.log(event));
on(EVENTS.mutation.error, event => console.log(event));
```

The `on` function takes a single event name and a callback and returns an `EventListener` object with a single `dispose` method on it for detaching the listener.

The `event` payload has the following definition:

```typescript
interface EventPayload<TData> {
    sender: string; // The event source (ie. core, devtools etc)
    store: string; // The name of the store this event originated on
    data: TData; // Any data related to this event
}
```

The `data` property varies between events however for all mutation events the `data` object has the following definition:

```typescript
interface MutationEventData<TPayload, TResult> {
    mutation: string; // The name of the mutation that occurred
    payload: TPayload; // The payload sent to the mutation
    result?: TResult; // The result returned from the mutation.
}
```

The `result` property will be `undefined` for the `mutation:before` event or if the mutation does not return a result.


### Global Triggers

The same trigger logic above can be used for global triggers using the `on` event from `@harlem/core` as opposed to from a specific store.

```typescript
import {
    EVENTS,
    createStore,
    on,
    once
} from '@harlem/core';

const STATE = {
    firstName: 'John',
    lastName: 'Smith'
};

const store = createStore('user', STATE);

on(EVENTS.mutation.before, event => console.log(event));
on(EVENTS.mutation.after, event => console.log(event));
on(EVENTS.mutation.error, event => console.log(event));
```