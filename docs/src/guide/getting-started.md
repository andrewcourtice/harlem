# Getting Started

Gettng started with Harlem is easy. Just follow the steps below and you'll be up and running in no time.

## Installation

Install `@harlem/core` and any plugins you wish to include (I recommend installing `@harlem/plugin-devtools` during development):
```
npm install @harlem/core
```
Or if you're using Yarn:
```
yarn add @harlem/core
```

## Register Harlem

Register the Harlem plugin with your Vue app instance:
```typescript
import App from './app.vue';
import Harlem from '@harlem/core';

createApp(App)
    .use(Harlem)
    .mount('#app');
```

## Create a store

Create your store and write any getters/mutations:
```typescript
import {
    createStore
} from '@harlem/core';

const STATE = {
    firstName: 'John',
    lastName: 'Smith'
};

const {
    state,
    getter,
    mutation,
    on
} = createStore('user', STATE);
```

### See Also

[Create Store](/api-reference/#createStore) API Reference