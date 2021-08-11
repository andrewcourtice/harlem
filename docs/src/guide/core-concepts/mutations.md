# Mutations

Mutations are the foundation of Harlem. A mutation is the only means by which state can be mutated. This is to ensure every change to state is predictable and auditable.

Mutations are simple functions that take a payload in, mutate state, and optionally return a result.

## Defining a Mutation

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


## Usage in Components

```html
<template>
    <div class="app">
        <h1>Hello {{ name }}</h1>
        <input type="text" v-model="name" placeholder="Name">
    </div>
</template>

<script lang="ts" setup>
import {
    computed
} from 'vue';

import {
    state,
    setName
} from './stores/user';

const name = computed({
    get: () => state.name,
    set: value => setName(value)
});
</script>
```

## See Also

[Mutation](/api-reference/store.html#mutation) API Reference