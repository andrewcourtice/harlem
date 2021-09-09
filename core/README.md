<p align="center">
    <a href="https://harlemjs.com">
        <img src="https://raw.githubusercontent.com/andrewcourtice/harlem/main/docs/src/.vuepress/public/assets/images/logo-192.svg" alt="Harlem"/>
    </a>
</p>

# Harlem

![npm](https://img.shields.io/npm/v/@harlem/core)

This is the core Harlem package. For a general overview of Harlem see [here](https://github.com/andrewcourtice/harlem) or check out the [complete documentation](https://harlemjs.com/).


## Getting started

1. Install `@harlem/core`:
```bash
yarn add @harlem/core
# or
npm install @harlem/core
```

2. Register the Harlem plugin with your Vue app instance:
```typescript
import App from './app.vue';
import Harlem from '@harlem/core';

createApp(App)
    .use(Harlem)
    .mount('#app');
```

3. Create your store and write any getters, mutations or actions (if using the actions extension):
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
export const setFirstName = mutation('set-first-name', (state, payload) => state.firstName = payload);
export const setLastName = mutation('set-last-name', (state, payload) => state.lastName = payload);
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