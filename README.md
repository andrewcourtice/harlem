<p align="center">
    <a href="https://harlemjs.com">
        <img src="https://raw.githubusercontent.com/andrewcourtice/harlem/main/app/src/assets/images/logo-192.svg" alt="Harlem"/>
    </a>
</p>

# Harlem

![npm](https://img.shields.io/npm/v/@harlem/core)

Simple, unopinionated, lightweight and extensible state management for Vue 3. Take a look at the [demo](https://harlemjs.com/demo/basic) to see it in action or play around with it in [CodeSandbox](https://codesandbox.io/s/harlem-demo-lmffj).

<!-- TOC depthfrom:2 depthto:3 -->

- [Features](#features)
    - [Simple](#simple)
    - [Unopinionated](#unopinionated)
    - [Immutable](#immutable)
    - [Lightweight](#lightweight)
    - [Extensible](#extensible)
    - [Great DX](#great-dx)
- [Getting started](#getting-started)
- [Devtools integration](#devtools-integration)
- [TypeScript support](#typescript-support)
- [Plugins](#plugins)
- [FAQ](#faq)
    - [What about actions?](#what-about-actions)
    - [Can I share state between stores?](#can-i-share-state-between-stores)
    - [Does Harlem have a file structure convention for stores?](#does-harlem-have-a-file-structure-convention-for-stores)
- [Credits](#credits)

<!-- /TOC -->

## Features

### Simple
Harlem has a simple functional API for creating, reading and mutating state. At it's heart, Harlem just uses Vue reactive objects and computeds which means if you know how to use Vue, you'll know how to use Harlem.

### Unopinionated
Harlem doesn't impose any standards or conventions on your codebase. Because of it's simple functional API you can structure your code anyway you want and Harlem will just work.

### Immutable
All state provided from a Harlem store is immutable by default. The only write access to state is through mutations. This ensures all updates to your store are tracable, thereby reducing the amount of bugs produced by code unpredictably mutating state.

### Lightweight
Harlem weighs in at around 1KB (minified & gzipped) which makes it the perfect solution for codebases of all sizes. Harlem is also designed to be tree-shakable - unused stores, getters, or mutations will be removed from your code at build time (provided you are using a build tool that supports tree-shaking). 

It's also worth noting that Harlem has **zero** dependencies (apart from Vue obviously).

### Extensible
Harlem uses a plugin architecture so you can extend it any way you want. Some of the official plugins include Vue devtools integration, local/session storage sync, and transactions for rolling back multiple mutations when write errors occur.

### Great DX
Harlem has a great developer experience. It's built using TypeScript so all of your state, getters, and mutations are strongly typed. Harlem also has devtools integration so you can explore your stores and see mutation events on the timeline in realtime.

**Disclaimer**: *Harlem is currently experimental and subject to change as the Vue 3 ecosystem continues to stabilise. It is not recommended to use Harlem in critical client-facing production software at this stage. Once Harlem is considered stable for production applications the version will be bumped from patch increments to a minor increment (eg. will move from version 1.0.x to version 1.x.0) which may introduce breaking changes.*

## Getting started
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

export const setFirstName = mutation('setFirstName', (state, payload) => {
    state.firstName = payload || '';
});

export const setLastName = mutation('setLastName', (state, payload) => {
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

## Devtools integration

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

See the [devtools plugin docs](plugins/devtools) for more information on the options available. 

![Harlem Devtools](https://user-images.githubusercontent.com/11718453/95668309-aa5ade00-0bb5-11eb-99f5-1fea4d2061ff.gif)

*At the time of writing this you will need to use the Beta version of the Vue devtools.*


## TypeScript support
Harlem fully supports Typescript - just decorate your mutation with the payload type and Harlem will take care of the rest:

```typescript
export const setFirstName = mutation<string>('setFirstName', (state, payload) => {
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


## Plugins

Harlem is completely extensible through plugins. Feel free to choose from some of the official plugins or write your own. See the [plugins documentation](plugins) from more information on the official set of plugins or how to author your own plugin.

Some of the official plugins include:

- [Devtools](plugins/devtools) (`@harlem/plugin-devtools`) - The devtools plugin adds Vue devtools integration with your stores to show updates to your state in realtime.
- [Reset](plugins/reset) (`@harlem/plugin-reset`) - The reset plugin provides an API to reset stores to their initial state.
- [Snapshot](plugins/snapshot) (`@harlem/plugin-snapshot`) - The snapshot plugin provides an API to snapshot a store's state at a given point and apply it when convenient.
- [SSR](plugins/ssr) (`@harlem/plugin-ssr`) - The SSR plugin enables support for using Harlem stores in a server-side rendered application.
- [Storage](plugins/storage) (`@harlem/plugin-storage`) - The storage plugin provides simple local/session storage synchronisation with your state. This plugin relieves the burden of having to manually save your state to a web storage resource.
- [Transactions](plugins/transaction) (`@harlem/plugin-transaction`) - The transaction plugin provides an API for defining transactions that run multiple mutations. A transaction can safely rollback mutations in the event of an error.


## FAQ

### What about actions?
Harlem doesn't provide a mechanism for actions - this is by design. Actions are commonly asynchronous methods that contain business logic which group a single mutation or set of mutations together. Harlem leaves your action design up to you. Here is a simple example of an action using Harlem:

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

export const myNumberGetter = getter('myNumber', state => state.myNumber +  otherState.otherNumber);
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

## Credits

- Logo design by [Ethan Roxburgh](https://github.com/ethanroxburgh)