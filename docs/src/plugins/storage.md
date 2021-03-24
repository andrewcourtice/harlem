# Storage

![npm](https://img.shields.io/npm/v/@harlem/plugin-storage)

This is the official Harlem storage plugin for adding local/session storage synchronisation to your stores. This plugin will write the specified stores to local/session storage upon mutation.


## Installation

Before installing the storage plugin make sure you installed `@harlem/core`.

Install `@harlem/plugin-storage`:
```
npm install @harlem/plugin-storage
```
Or if you're using Yarn:
```
yarn add @harlem/plugin-storage
```

## Usage

Create an instance of the plugin and register it with Harlem:
```typescript
import App from './app.vue';

import harlem from '@harlem/core';
import createStoragePlugin from '@harlem/plugin-storage';

const storagePlugin = createStoragePlugin('*', {
    type: 'local',
    prefix: 'my-app',
    sync: true
});

createApp(App)
    .use(harlem, {
        plugins: [storagePlugin]
    })
    .mount('#app');
```

Open your Vue devtools and go to `Application` -> `Local/Session Storage` to see your store written to storage.


### Options

The first argument of the `createStoragePlugin` function is a string or array of strings indicating the name(s) of the stores to write to/from storage. If the value is defined as a wildcard `*`, all stores will be written to storage.

- **type** (string?): The type of storage to write to. This can be either `local` or `session`. The default is `local`.
- **prefix** (string?): The prefix to apply to the store name in storage. If specified, the storage key would appear as `prefix:storeName`. For example if I specified a prefix of `my-app` and my store was called `data`, the resulting storage entry would appear as `my-app:data`.
- **sync** (boolean?): A flag indicating whether sync changes to storage back to state. This is particularly useful for synchronising state between tabs etc. The default is `true`

*(?) indicates an optional field*


## Warning

There a few important items to note before using this plugin:

1. This plugin will **not** automatically load previously written storage into state upon creation of the plugin. This is by design as trying to resolve conflicts between base state and stored state can vary greatly between use-cases. To use previously stored state as your store's base state you can do something along the lines of:
```typescript
// state.ts

const STATE = {
    firstName: 'John',
    lastName: 'Smith'
};

function getState() {
    const storedState = localStorage.getItem('my-app:data');

    if (!storedState) {
        return STATE;
    }

    const state = JSON.parse(storedState);

    return {
        ...STATE,
        ...state
    };
}

export default getState();
```
2. Be careful when using this plugin with multiple sessions as multiple sessions may case race conditions that will make your mutations unpredictable and difficult to debug.