# Harlem Core

This is the core harlem package. Head over to [harlemjs.com](https://harlemjs.com) to get started or take a look at the [demo](https://andrewcourtice.github.io/harlem) to see it in action.


## Getting Started

Getting started with Harlem is easy. Just follow the steps below and you'll be up and running in no time.

### Installation

Install `@harlem/core` and any [plugins](/plugins/)/[extensions](/extensions/) you wish to include.

```bash
# yarn
yarn add @harlem/core

# npm
npm install @harlem/core
```


### Register the Harlem Vue plugin

Register the Harlem plugin with your Vue app instance:
```typescript
import App from './app.vue';

import {
    createVuePLugin
} from '@harlem/core';

createApp(App)
    .use(createVuePlugin())
    .mount('#app');
```


### Create your first store

Create your store and define any getters, actions or mutations:

```typescript
import {
    createStore
} from '@harlem/core';

// The initial state for this store
const STATE = {
    firstName: 'John',
    lastName: 'Smith'
};

// Create the store, specifying the name and intial state
export const {
    state, 
    getter,
    mutation,
    action,
    ...store
} = createStore('user', STATE);

export const fullName = getter('fullname', state => `${state.firstName} ${state.lastName}`);

export const setFirstName = mutation('set-first-name', (state, payload: string) => {
    state.firstName = payload;
});

export const setLastName = mutation('set-last-name', (state, payload: string) => {
    state.lastName = payload;
});

export const loadDetails = action('load-details', async (id: string, mutate) => {
    const response = await fetch(`/api/details/${id}`);
    const details = await response.json();

    mutate(state => {
        state.details = details;
    });
});
```

### Use your store in your app

To use your store in your app just import the parts of it you need.

```html
<template>
    <div class="app">
        <h1>Hello {{ fullName }}</h1>
        <button @click="loadDetails()">Load Details</button>
        <input type="text" v-model="firstName" placeholder="First name">
        <input type="text" v-model="lastName" placeholder="Last name">
    </div>
</template>

<script lang="ts" setup>
import {
    computed
} from 'vue';

import {
    state,
    fullName,
    setFirstName,
    setLastName,
    loadDetails
} from './stores/user';

const firstName = computed({
    get: () => state.firstName,
    set: value => setFirstName(value)
});

const lastName = computed({
    get: () => state.lastName,
    set: value => setLastName(value)
});
</script>
```