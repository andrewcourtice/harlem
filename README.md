<p align="center">
    <a href="https://harlemjs.com">
        <img src="https://raw.githubusercontent.com/andrewcourtice/harlem/main/docs/src/public/assets/images/logo-192.svg" alt="Harlem"/>
    </a>
</p>

# Harlem

[![Build and Test](https://github.com/andrewcourtice/harlem/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/andrewcourtice/harlem/actions/workflows/build-and-test.yml)
![npm](https://img.shields.io/npm/v/harlem)

Powerfully simple global state management for Vue 3. Head over to [harlemjs.com](https://harlemjs.com) to get started or take a look at the [demo](https://andrewcourtice.github.io/harlem) to see it in action.

<!-- TOC depthfrom:2 depthto:2 -->

- [Foundations](#foundations)
- [Features](#features)
- [Getting started](#getting-started)
- [Extensibility](#extensibility)
- [Documentation](#documentation)
- [Credits](#credits)

<!-- /TOC -->

## Foundations

### Simple 
Harlem has a simple functional API for creating, reading and mutating state. From the most basic global state management needs to the most complex, Harlem has you covered.

### Safe
All state exposed from a Harlem store is immutable. State can only be changed through mutations/actions making your state predictable and auditable.

### Modular
Harlem is super lightweight, tree-shakeable, and dependency-free! It is designed to be used with native ES modules so even unused parts of your stores (getters, mutations, actions etc.) can be tree-shaken.

### Extensible
Harlem comes with a suit of official extensions that allow you to add extra features to your stores such as cancellable actions, tracing, transactions, undo/redo, and more. You can even write your own extension or plugin.

### Great DX
Harlem has a great developer experience. It's built using TypeScript so all of your state, getters, and mutations are strongly typed. Harlem also has Vue devtools integration so you can explore your stores and see store events on the timeline in realtime.

### Battle-Tested
Harlem is built by enterprise software engineers and used in medium-large enterprise software. It's built to handle even the most complex state management use-cases.


## Features

- TypeScript support
- Vue devtools integration
- Lightweight & dependency-free
- Tree-shakeable
- Extensible (via plugins & extensions)
- SSR Support

Check out the [docs](https://harlemjs.com) for more details.


## Getting Started

Getting started with Harlem is easy. Just follow the steps below and you'll be up and running in no time.

### Installation

Install `harlem` and any [plugins](/plugins/)/[extensions](/extensions/) you wish to include.

```bash
# yarn
yarn add harlem

# npm
npm install harlem
```

The [devtools plugin](/plugins/official/devtools) is enabled by default during development and tree-shaken out of production builds. If you don't need devtools during develpment, you can instead install harlem from `@harlem/core`

If you're using Nuxt, instead follow the instructions to [install the Nuxt module](https://github.com/nuxt-community/harlem-module) and then resume this guide below, at [Create your first store](#create-your-first-store).


### Register the Harlem Vue plugin

Register the Harlem plugin with your Vue app instance:
```typescript
import App from './app.vue';

import {
    createVuePlugin
} from 'harlem';

createApp(App)
    .use(createVuePlugin())
    .mount('#app');
```


### Create your first store

Create your store and define any getters, actions or mutations:

```typescript
import {
    createStore
} from 'harlem';

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


## Extensibility

Harlem uses a combination of extensions and plugins to extend core functionality. 

### Extensions

Extensions are per-store additions to Harlem's core functionaility. Extensions are often used for adding store features, changing store behaviour and various other low-level tasks. This is the primary method in which Harlem stores are extended. Feel free to choose from some of the official extensions or write your own. See the [extensions documentation](https://harlemjs.com/extensions/) from more information on the official set of extensions or how to author your own plugin.

The official extensions include:

- [Action](extensions/action) (`@harlem/extension-action`) - Extends a store to support advanced actions (cancellation, status & error tracking etc.).
- [Compose](extensions/compose) (`@harlem/extension-compose`) - Extends a store to to add simple read/write convenience methods.
- [History (preview)](extensions/history) (`@harlem/extension-history`) - Extends a store to support undo and redo capabilities.
- [Lazy](extensions/lazy) (`@harlem/extension-lazy`) - Extends a store to support lazy async getters.
- [Storage](extensions/storage) (`@harlem/extension-storage`) - Extends a store to support synchronising state to/from `localStorage` or `sessionStorage`.
- [Trace](extensions/trace) (`@harlem/extension-trace`) - Extends a store to support tracing granular changes to state during mutations. Useful for auditing during development.
- [Transaction](extensions/transaction) (`@harlem/extension-transaction`) - Extends a store to support rolling back multiple mutations if one fails. 

### Plugins

Plugins are global extensions to Harlem's core functionality. Plugins are often used for generic store operations like tracking events and collating state. Feel free to choose from some of the official plugins or write your own. See the [plugins documentation](https://harlemjs.com/plugins/) from more information on the official set of plugins or how to author your own plugin.

The official plugins include:

- [Devtools](plugins/devtools) (`@harlem/plugin-devtools`) - The devtools plugin adds Vue devtools integration with your stores to show updates to your state in realtime.
- [SSR](plugins/ssr) (`@harlem/plugin-ssr`) - The SSR plugin enables support for using Harlem stores in a server-side rendered application.


## Documentation
Full documentation for Harlem is available at https://harlemjs.com.

## Usage Trend
[Usage Trend of Harlem Packages](https://npm-compare.com/@harlem/core,@harlem/plugin-devtools,@harlem/task,@harlem/plugin-ssr,@harlem/extension-trace,@harlem/extension-action,@harlem/extension-storage,@harlem/extension-history,@harlem/extension-lazy,@harlem/extension-transaction,@harlem/extension-compose,@harlem/utilities,@harlem/extension-snapshot,@harlem/extension-reset)

## Credits

Logo design by [Ethan Roxburgh](https://github.com/ethanroxburgh)
