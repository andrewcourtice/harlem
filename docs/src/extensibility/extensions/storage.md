# Storage Extension

![npm](https://img.shields.io/npm/v/@harlem/extension-storage)

This is the official storage extension for Harlem. The storage extension adds the ability to storage a store's state at a particular point in time and reapply it later. 

## Getting Started

Follow the steps below to get started using the storage extension.

### Installation

Before installing this extension make sure you have installed `@harlem/core`.

Install `@harlem/extension-storage`:
```
npm install @harlem/extension-storage
```
Or if you're using Yarn:
```
yarn add @harlem/extension-storage
```

### Registration

To get started simply register this extension with the store you wish to extend.

```typescript{16-18,21-28}
import storageExtension from '@harlem/extension-storage';

import {
    createStore
} from '@harlem/core';

const STATE = {
    firstName: 'Jane',
    lastName: 'Smith'
};

const {
    state,
    getter,
    mutation,
    startStorageSync,
    stopStorageSync,
    clearStorage
} = createStore('example', STATE, {
    extensions: [
        storageExtension({
            type: 'local',
            prefix: 'harlem',
            sync: true,
            exclude: [],
            serialiser: state => JSON.stringify(state),
            parser: value => JSON.parse(value)
        })
    ]
});
```

The storage extension adds 3 methods to the store instance: `startStorageSync`, `stopStorageSync` and `clearStorage`.


## Usage

### Options
The storage extension method accepts an options object with the following properties:
- **type**: `string` - The type of storage interface to use. Acceptable values are `local` or `session`. Default value is `local`.
- **prefix**: `string` - The prefix to use on the storage key. The storage value will be in the form `${prefix}:${storeName}`. Default value is `harlem`.
- **sync**: `boolean` - Whether to automatically sync changes from the storage interface back to the store. Default value is `true`.
- **exclude**: `string[]` - A list of mutation names to exclude from triggering a storage sync event.
- **serialiser**: `unknown => string` - A function to serialise the store to string. The default behaviour is `JSON.stringify`.
- **parser**: `string => unknown` - A function to serialise the storage string to a state structure. The default behaviour is `JSON.parse`.

### Manually starting/stopping sync
The `startStorageSync` and `stopStorageSync` methods can be used to start or stop sync behaviour.


### Clearing storage
Use the `clearStorage` method to clear all stored data relating to this store.


## Considerations
Please keep the following points in mind when using this extension:

- The default behaviour for serialising/parsing only supports JSON-compatible types. For non-JSON-compatible types please specify a custom serialiser/parser. See [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description) for a list of JSON-compatible types.