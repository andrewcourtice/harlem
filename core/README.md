<p align="center">
    <a href="https://harlemjs.com">
        <img src="https://raw.githubusercontent.com/andrewcourtice/harlem/main/app/src/.vuepress/public/assets/images/logo-192.svg" alt="Harlem"/>
    </a>
</p>

# Harlem

![npm](https://img.shields.io/npm/v/@harlem/core)

This is the core Harlem package. For a general overview of Harlem see [here](https://github.com/andrewcourtice/harlem).

<!-- TOC depthfrom:2 depthto:3 -->

- [Getting started](#getting-started)
- [API reference](#api-reference)
    - [Plugin Options](#plugin-options)
    - [Core methods](#core-methods)
    - [Store methods](#store-methods)
    - [Events](#events)

<!-- /TOC -->

## Getting started

1. Install `@harlem/core`:
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

## API reference

### Plugin Options
The Harlem Vue plugin is the default export of `@harlem/core`.


```typescript
{
    plugins: [] // an array of Harlem plugins (eg. the devtools plugin)
}
```

### Core methods

#### createStore(name, state)

Creates a new store with the given name and initial state.

##### Arguments
- **name**: string
- **state**: object

##### Returns
[Store Instance](#store-methods)

##### Example
```typescript
const store = createStore('store', {
    foo: 1,
    bar: 2
});
```


### Store methods

#### getter(name, producer)

Creates a new getter with the given name using the return value of the producer function as it's computed value.

##### Arguments
- **name**: string
- **producer**: function (args below)
    - **state**: readonly state object

##### Returns
A Vue computed

##### Example
```typescript
const name = getter('name', state => `${state.firstName} ${state.lastName}`);
```


#### mutation(name, mutator)

Creates a new mutation with the given name. This returns a method that accepts a payload as it's only argument.

##### Arguments
- **name**: string
- **mutator**: function (args below)
    - **state**: writable state object
    - **payload**: any

##### Returns
Function

##### Example
```typescript
const setFirstName = mutation('set-firstname', (state, payload) => state.firstName = payload);

// Usage
setFirstName('John');
```


#### on(event, callback)

Attaches a listener to the given event name. This is useful for tracking mutations, errors or plugin events.

##### Arguments
- **event**: string
- **callback**: function

##### Returns
Event Listener

##### Example
```typescript
const listener = on('mutation:after', (mutationName, payload) => {
    console.log(mutationName, payload);
});

// Dispose when finished
listener.dispose();
```


### Events

- **core:installed**: The Harlem plugin has been installed
- **store:created**: A new store has been created
- **store:destroyed**: A store has been destroyed
- **mutation:before**: Before a mutation is about the occur
- **mutation:after**: After a mutation has occurred
- **mutation:error**: An error occurred during a mutation

All events have the same payload structure:
```typescript
{
    store, // The name of the store this event applies to
    sender, // The source of the event (eg. core, devtools-plugin etc.)
    data // Any data relevant to the event (eg. for a mutation the data will contain the name of the mutation and the payload)
}
```