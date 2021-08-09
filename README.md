<p align="center">
    <a href="https://harlemjs.com">
        <img src="https://raw.githubusercontent.com/andrewcourtice/harlem/main/docs/src/.vuepress/public/assets/images/logo-192.svg" alt="Harlem"/>
    </a>
</p>

# Harlem

[![Build and Test](https://github.com/andrewcourtice/harlem/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/andrewcourtice/harlem/actions/workflows/build-and-test.yml)
![npm](https://img.shields.io/npm/v/@harlem/core)

Simple, unopinionated, lightweight and extensible state management for Vue 3. Head over to [harlemjs.com](harlemjs.com) to get started or take a look at the [demo](https://codesandbox.io/s/harlem-demo-lmffj) to see it in action.

<!-- TOC depthfrom:2 depthto:4 -->

- [Features](#features)
    - [Simple](#simple)
    - [Unopinionated](#unopinionated)
    - [Immutable](#immutable)
    - [Lightweight](#lightweight)
    - [Extensible](#extensible)
    - [Great DX](#great-dx)
- [Getting started](#getting-started)
- [Core concepts](#core-concepts)
    - [State](#state)
    - [Getters](#getters)
    - [Mutations](#mutations)
    - [Actions](#actions)
    - [Triggers](#triggers)
- [TypeScript support](#typescript-support)
- [Devtools integration](#devtools-integration)
- [Server-Side Rendering](#server-side-rendering)
- [Extensibility](#extensibility)
    - [Extensions](#extensions)
    - [Plugins](#plugins)
- [FAQ](#faq)
    - [Why aren't actions included by default?](#why-arent-actions-included-by-default)
    - [Can I share state between stores?](#can-i-share-state-between-stores)
    - [Does Harlem have a file structure convention for stores?](#does-harlem-have-a-file-structure-convention-for-stores)
        - [Single file structure](#single-file-structure)
        - [Multi-file structure](#multi-file-structure)
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
Harlem core weighs in at around 1.5KB (minified & gzipped) which makes it the perfect solution for codebases of all sizes. It is also designed to be tree-shakable - unused stores, getters, or mutations will be removed from your code at build time (provided you are using a build tool that supports tree-shaking). 

It's also worth noting that Harlem has **zero** dependencies.

### Extensible
Harlem is architectured with extensibility in mind so you can extend it any way you want through [plugins](#plugins) and [extensions](#extensions). Some of the official plugins and extensions include Vue devtools integration, local/session storage sync, snapshots, history (undo/redo) and more.

### Great DX
Harlem has a great developer experience. It's built using TypeScript so all of your state, getters, and mutations are strongly typed. Harlem also has devtools integration so you can explore your stores and see mutation events on the timeline in realtime.


## Getting started
Getting started is simple:

1. Install `@harlem/core` and any plugins you wish to include (it is recommended to install `@harlem/plugin-devtools` during development):
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

<script lang="ts" setup>
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

## Core concepts

Harlem, much like Vuex, follows a Redux-like state management pattern. Harlem's functionality can be divided into 3 main concepts:
- State - The single source of truth for your data (read-only).
- Getters - Computed side-effects of mutations to state (read-only).
- Mutations - The means by which state is changed (read/write).
- Actions (available via `@harlem/extension-action`) - Cancellable async methods for batching mutations, api requests etc (async read/write). Refer to this FAQ to see why actions aren't included in the core package by default.

Where Harlem differs from Vuex is that as opposed to having one monolithic state tree, Harlem uses the concept of stores to create logical boundaries between disparate data.

### State

The state tree is the single source of truth for any given store. Once a store has been created, the state tree is strictly **readonly**. The initial state for a store is defined upon store creation.


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

### Getters

If you have used Vuex before you will likely be familiar with the concept of a `getter`. A `getter` is a computed store property that is automatically updated when state changes.

Getters are particularly useful for joining different parts of state together or mapping data. In Harlem getters are always **readonly**.

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

### Mutations

Mutations are the foundation of Harlem. A mutation is the only means by which state can be mutated. This is to ensure every change to state is predictable and auditable.

Mutations are simple functions that take a payload in, mutate state, and optionally return a result.

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

### Actions

Actions are asynchronous methods that often batch network requests with one or more state mutations. Becuase action implementations vary widely Harlem doesn't include actions by default in the core package but instead through an optional extension (@harlem/extension-action).

The action implementation in the Harlem action extension includes features like cancellation, nested actions and indirect status checks. See that [action extension](extensions/action) documentation for more information.

```typescript
export default action('load-user-data', async (id: number, mutate, controller) => {
    const userData = await fetch(`/api/user-data/${id}`, {
        signal: controller.signal
    });

    mutate(state => Object.assign(state.details.user, userData));
});
```

### Triggers

Triggers allow you to react to global or specific store events. Harlem uses an event-driven model to remain fast and lean while still providing flexible plugin hooks. The upside to this is that you can hook into specific Harlem events and react to them.

Triggers are particularly useful for reacting to certain mutations to perform async tasks. For instance, a trigger would allow you to send state back to a server after certain mutations.

```typescript
const {
    on,
    once,
    onBeforeMutation,
    onAfterMutation,
    onMutationSuccess,
    onMutationError,
} = createStore('user', STATE);

onMutationSuccess('my-mutation-name', event => {
    saveState();
});
```


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


## Server-Side Rendering

Harlem supports using stores in an SSR application via the SSR plugin (`@harlem/plugin-ssr`). Refer to the SSR plugin documentation for more information and how to get started. The SSR plugin docs are available [here](plugins/ssr).


## Extensibility

Harlem uses a combination of extensions and plugins to extend core functionality. 

### Extensions

Extensions are per-store additions to Harlem's core functionaility. Extensions are often used for adding store features, changing store behaviour and various other low-level tasks. This is the primary method in which Harlem stores are extended. Feel free to choose from some of the official extensions or write your own. See the [extensions documentation](extensions) from more information on the official set of extensions or how to author your own plugin.

The official extensions include:

- [Action](extensions/action) (`@harlem/extension-action`) - Extends a store to support cancellable async actions.
- [History](extensions/history) (`@harlem/extension-history`) - Extends a store to support undo and redo capabilities.
- [Lazy](extensions/lazy) (`@harlem/extension-lazy`) - Extends a store to support lazy async getters.
- [Reset](extensions/reset) (`@harlem/extension-reset`) - Extends a store to support resetting a store back to it's original state.
- [Snapshot](extensions/snapshot) (`@harlem/extension-snapshot`) - Extends a store to support taking snapshots of state and applying it at a later stage.
- [Storage](extensions/storage) (`@harlem/extension-storage`) - Extends a store to support synchronising state to/from `localStorage` or `sessionStorage`.
- [Trace](extensions/trace) (`@harlem/extension-trace`) - Extends a store to support tracing granular changes to state during mutations. Useful for auditing during development.
- [transaction](extensions/transaction) (`@harlem/extension-transaction`) - Extends a store to support rolling back multiple mutations if one fails. 

### Plugins

Plugins are global extensions to Harlem's core functionality. Plugins are often used for generic store operations like tracking events and collating state. Feel free to choose from some of the official plugins or write your own. See the [plugins documentation](plugins) from more information on the official set of plugins or how to author your own plugin.

The official plugins include:

- [Devtools](plugins/devtools) (`@harlem/plugin-devtools`) - The devtools plugin adds Vue devtools integration with your stores to show updates to your state in realtime.
- [SSR](plugins/ssr) (`@harlem/plugin-ssr`) - The SSR plugin enables support for using Harlem stores in a server-side rendered application.


## FAQ

### Why aren't actions included by default?
The decision to not include actions in the core package by default is to remain faithful to the philosophy of keeping Harlem lightweight, simple and unopinionated. Different projects have different needs for actions. Some larger projects may require nested actions and cancellation while smaller projects may not need all of those features but instead just need simple direct mutations. 

To ship a full action implementation as part of the core package would force every project (especially the small projects) to incur that cost (size, performance etc.) even if not all of the action features are being used. For this reason Harlem provides a [full-featured action implementation](extensions/action) as an optional extension and leaves your action implementation up to you should you wish to keep things simple or get really complex.


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
