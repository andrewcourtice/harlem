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

Documentation coming soon...