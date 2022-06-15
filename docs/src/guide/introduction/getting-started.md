# Getting Started

Getting started with Harlem is easy. Just follow the steps below and you'll be up and running in no time.

## Installation

Install `@harlem/core` and any plugins you wish to include (I recommend installing `@harlem/plugin-devtools` during development):

```bash
yarn add @harlem/core
# or
npm install @harlem/core
```

**Note**: If you're using Nuxt, instead follow the instructions to [install the Nuxt module](https://github.com/nuxt-community/harlem-module) and then resume this guide below, at [Create your first store](#create-your-first-store).

## Register the Harlem plugin

Register the Harlem plugin with your Vue app instance:
```typescript
import App from './app.vue';
import Harlem from '@harlem/core';

createApp(App)
    .use(Harlem)
    .mount('#app');
```

## Create your first store

Create your store and define any getters/mutations:

```typescript
import {
    createStore
} from '@harlem/core';

const STATE = {
    firstName: 'John',
    lastName: 'Smith'
};

export const {
    state,
    getter,
    mutation,
    ...store
} = createStore('user', STATE);

export const fullName = getter('fullname', state => {
    return `${state.firstName} ${state.lastName}`;
});

export const setFirstName = mutation('set-first-name', (state, payload: string) => {
    state.firstName = payload;
});

export const setLastName = mutation('set-last-name', (state, payload: string) => {
    state.lastName = payload;
});
```

Or if you're using actions:

```typescript
import actionExtension from '@harlem/extension-action';

import {
    createStore
} from '@harlem/core';

const STATE = {
    firstName: 'John',
    lastName: 'Smith'
};

export const {
    state,
    getter,
    mutation,
    action,
    ...store
} = createStore('user', STATE, {
    extensions: [
        actionExtension()
    ]
});

export const fullName = getter('fullname', state => {
    return `${state.firstName} ${state.lastName}`;
});

export const loadUserData = action('load-user-data', async (id: string, mutate, { signal }) => {
    const response = await fetch(`/api/users/${id}`, { signal });

    const {
        firstName,
        lastName,
    } = await response.json();

    mutate(state => {
        state.firstName = firstName;
        state.lastName = lastName;
    });
});
```

## Use your store in your app

To use your store in your app just import the parts you need and the rest is history.

```html
<template>
    <div class="app">
        <h1>Hello {{ fullName }}</h1>
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
    setLastName
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

### See also

[Create Store](/api/global#createStore) API Reference