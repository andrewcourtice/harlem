# Harlem
Simple, unopinionated, lightweight and extensible state management for Vue 3. Take a look at the demo on CodeSandbox to see it in action: [Demo](https://codesandbox.io/s/harlem-demo-lmffj)

<!-- TOC depthfrom:2 depthto:3 -->

- [Features](#features)
    - [Simple](#simple)
    - [Unopinionated](#unopinionated)
    - [Immutable](#immutable)
    - [Lightweight](#lightweight)
    - [Extensible](#extensible)
    - [Great DX](#great-dx)
- [Getting Started](#getting-started)
- [Devtools Integration](#devtools-integration)
- [Typescript Support](#typescript-support)
- [FAQ](#faq)
    - [What about actions?](#what-about-actions)
    - [Can I share state between stores?](#can-i-share-state-between-stores)
    - [Does Harlem have a file structure convention for stores?](#does-harlem-have-a-file-structure-convention-for-stores)

<!-- /TOC -->

## Features

### Simple
Harlem has a simple functional API for creating, reading and mutating state. At it's heart, Harlem just uses Vue reactive objects and computeds which means if you know how to use Vue, you'll know how to use Harlem.

### Unopinionated
Harlem doesn't impose any standards or conventions on your codebase. Because of it's simple functional API you can structure your code anyway you want and Harlem will just work.

### Immutable
All state provided from a Harlem store is immutable by default. The only write access to state is through mutations. This ensures all updates to your store are tracable, thereby reducing the amount of bugs produced by code unpredictably mutating state.

### Lightweight
Harlem weighs in at less than 1KB (minified & gzipped) which makes it the perfect solution for codebases of all sizes. Harlem is also designed to be tree-shakable - unused stores, getters, or mutations will be removed from your code at build time (provided you are using a build tool that supports tree-shaking).

### Extensible
Harlem uses a plugin architecture so you can extend it any way you want. Even the devtools integration is just a plugin.

### Great DX
Harlem has a great developer experience. It's built using typescript so all of your state, getters, and mutations are strongly typed. Harlem also has devtools integration so you can explore your stores and see mutation events on the timeline in realtime.


## Getting Started
Getting started is simple:

1. Install `@harlem/core` and any plugins you wish to include (I recommend installing `@harlem/plugin-devtools` during development):
```
npm install @harlem/core
```
Or if you're using Yarn:
```
yarn add @harlem/core
```

2. Register the Harlem plugin with your Vue app instance:
```typescript
import App from './app.vue';
import Harlem from '@harlem/core';

createApp(App)
    .use(Harlem)
    .mount('#app');
```

3. Create your store and write any getters/mutations:
```typescript
import {
    createStore
} from '@harlem/core';

const STATE = {
    firstName: 'John',
    lastName: 'Smith'
};

const {
    getter,
    mutation,
    ...store
} = createStore('user', STATE);

export const state = store.state;

export const fullName = getter('fullname', state => `${state.firstName} ${state.lastName}`);

export const setFirstName = mutation('set-first-name', (state, payload) => {
    state.firstName = payload || '';
});

export const setLastName = mutation('set-last-name', (state, payload) => {
    state.lastName = payload || '';
});
```

4. Use your store in your app:
```html
<template>
    <div class="app">
        <h1>Hello {{ fullName }}</h1>
        <input type="text" v-model="firstName" placeholder="First name">
        <input type="text" v-model="lastName" placeholder="Last name">
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed
} from 'vue';

import {
    state,
    fullName,
    setFirstName,
    setLastName
} from './stores/user';

export default defineComponent({

    setup() {
        const firstName = computed({
            get: () => state.firstName,
            set: setFirstName
        });
        
        const lastName = computed({
            get: () => state.lastName,
            set: setLastName
        });

        return {
            firstName,
            lastName,
            fullName
        };
    }

});
</script>
```

## Devtools Integration

Enabling devtools support is, you guessed it, simple. Just import `@harlem/plugin-devtools` and register it with your Harlem plugin:

```typescript
import App from './app.vue';
import Harlem from '@harlem/core';

import createDevtoolsPlugin from '@harlem/plugin-devtools';

import {
    createApp
} from 'vue';

function start() {
    let plugins = [];

    if (process.env.NODE_ENV === 'development') {
        plugins.push(createDevtoolsPlugin({
            label: 'State'
        }));
    }

    return createApp(App)
        .use(Harlem, {
            plugins
        })
        .mount('#app');
}

start();
```

See the devtools plugin docs for more information on the options available. 

*At the time of writing this you will need to use the Beta version of the Vue devtools.*

## Typescript Support
Harlem fully supports Typescript - just decorate your mutation with the payload type and Harlem will take care of the rest:

```typescript
export const setFirstName = mutation<string>('set-first-name', (state, payload) => {
    state.firstName = payload || ''
});
```

All other types (state, getters etc) are automatically inferred, however should you wish to define your own state type you can do so during store creation:

```typescript
import {
    createStore
} from '@harlem/core';

interface State {
    firstName?: string;
    lastName?: string;
};

const STATE: State = {
    firstName: 'John',
    lastName: 'Smith'
};

const {
    getter,
    mutation,
    ...store
} = createStore<State>('user', STATE);
```

In most cases this will be unnecessary but it can be useful for defining nullable fields or fields that don't exist at the time of store creation.


## FAQ

### What about actions?
Harlem doesn't provide a mechanism for actions - this is by design. Actions are commonly asynchronous methods that contain business logic which group a single mutation or set of mutations together. Harlem leaves your action design up to you. Here is an example of an action using Harlem:

``` typescript
import {
    setLoading,
    setUserDetails
} from './mutations';

export async function loadUserDetails(userId) {
    setLoading(true);

    try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();

        setUserDetails(data);
    } finally {
        setLoading(false);
    }
}
```


### Can I share state between stores?
Certainly - just import the state or getter from one store into the getter you are authoring on another store. For example:

```typescript
import {
    state as otherState
} from '../other-store;

import {
    getter
} from './store';

export const myNumberGetter = getter('my-number', state => state.myNumber +  otherState.otherNumber);
```

This also works for importing getters from other stores. Just remember that to access the value of a getter you will need to use the `.value` property of the getter. For example, if I had a getter name `myGetter` and I wanted to use it in another getter I would have to use `myGetter.value` to access it's raw value. 

See the Vue documentation on computeds for more information. [Vue Computed](https://v3.vuejs.org/api/computed-watch-api.html#computed).


### Does Harlem have a file structure convention for stores?
Short answer, no. Because Harlem attempts to be as unonpinionated as possible that means it's up to you to structure your store how you see fit. That being said here are 2 examples that may give you a headstart:

#### Single file structure
```
- stores
    - store1
        state.js
        getters.js
        mutations.js
        actions.js
        store.js
        index.js
    - store2
        state.js
        getters.js
        mutations.js
        actions.js
        store.js
        index.js
```

#### Multi-file structure
```
- stores
    - store1
        - getters
            getter-1.js
            getter-2.js
        - mutations
            mutation-1.js
            mutation-2.js
        - actions
            action-1.js
            action-2.js
        state.js
        store.js
        index.js
    - store2
        - getters
            getter-1.js
            getter-2.js
        - mutations
            mutation-1.js
            mutation-2.js
        - actions
            action-1.js
            action-2.js
        state.js
        store.js
        index.js
```

In both cases the `store.js` file and the `index.js` files would look roughly the same.

```typescript
// store.js

import STATE from './state';

import {
    createStore
} from '@harlem/core';

export const {
    state,
    getter,
    mutation,
    ...store
} = createStore('store1', STATE);
```

```typescript
// index.js - single file structure

export { state } from './store';

export {
    getter1,
    getter2
} from './getters';

export {
    mutation1,
    mutation2
} from './mutations';
```

```typescript
// index.js - multi-file structure

export { state } from './store';

export { default as getter1 } from './getters/getter-1';
export { default as getter2 } from './getters/getter-2';

export { default as mutation1 } from './mutations/mutation-1';
export { default as mutation2 } from './mutations/mutation-2';
```