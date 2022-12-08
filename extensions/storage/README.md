# Harlem Storage Extension

The storage extension adds the ability to sync store state to/from `localStorage` or `sessionStorage`.

## Getting Started

Follow the steps below to get started using the storage extension.

### Installation

Before installing this extension make sure you have installed `harlem`.

```bash
yarn add @harlem/extension-storage
# or
npm install @harlem/extension-storage
```

### Registration

To get started simply register this extension with the store you wish to extend.

```typescript
import storageExtension from '@harlem/extension-storage';

import {
    createStore
} from 'harlem';

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
    clearStorage,
    restoreStorage
} = createStore('example', STATE, {
    extensions: [
        storageExtension({
            type: 'local',
            prefix: 'harlem',
            sync: true,
            restore: false,
            include: '*',
            exclude: [],
            branch: state => state.firstName,
            serialiser: state => JSON.stringify(state),
            parser: value => JSON.parse(value)
        })
    ]
});
```

The storage extension adds several new methods to the store instance (highlighted above).


## Usage

### Options
The storage extension method accepts an options object with the following properties:
- **type**: `string` - The type of storage interface to use. Acceptable values are `local` or `session`. Default value is `local`.
- **prefix**: `string` - The prefix to use on the storage key. The storage value will be in the form `${prefix}:${storeName}`. Default value is `harlem`.
- **sync**: `boolean` - Whether to automatically sync changes from the storage interface back to the store. Default value is `true`.
- **restore**: `boolean` - Whether to automatically restore the state back from the storage on load. Default is `false`.
- **include**: `(string | regex)[]` - A matcher to specify which mutations trigger a storage sync event
- **exclude**: `(string | regex)[]` - A matcher to specify mutation names to exclude from triggering a storage sync event.
- **branch**: `state => any` - A function to a specific sub-branch of state to store as opposed to the whole state tree.
- **serialiser**: `unknown => string` - A function to serialise the store to string. The default behaviour is `JSON.stringify`.
- **parser**: `string => unknown` - A function to serialise the storage string to a state structure. The default behaviour is `JSON.parse`.

The default behaviour for serialising/parsing only supports JSON-compatible types. For non-JSON-compatible types please specify a custom serialiser/parser.

See the MDN documentation on JSON serialisation for more information: [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)


### Manually starting/stopping sync
The `startStorageSync` and `stopStorageSync` methods can be used to start or stop sync behaviour.


### Clearing storage
Use the `clearStorage` method to clear all stored data relating to this store.

### Restoring storage
Use the `restoreStorage` method to manually restore the state from storage.