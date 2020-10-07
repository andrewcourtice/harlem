# Harlem
Simple, unopinionated, lightweight and extensible state management for Vue 3. Take a look at the demo on CodeSandbox to see it in action: [Demo](https://codesandbox.io/s/harlem-demo-lmffj)

<!-- TOC -->

- [Harlem](#harlem)
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