# History Extension

![npm](https://img.shields.io/npm/v/@harlem/extension-history)

This is the official history extension for Harlem. The history extension adds undo and redo capabilities to your store for easily integrating history features into your application. 

## Getting Started

Follow the steps below to get started using the history extension.

### Installation

Before installing this extension make sure you have installed `@harlem/core`.

Install `@harlem/extension-history`:
```
npm install @harlem/extension-history
```
Or if you're using Yarn:
```
yarn add @harlem/extension-history
```

### Registration

To get started simply register this extension with the store you wish to extend.

```typescript{16-17,20-28}
import historyExtension from '@harlem/extension-history';

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
    undo,
    redo
} = createStore('example', STATE, {
    extensions: [
        historyExtension({
            max: 50,
            mutations: [
                {
                    name: 'set-name',
                    description: 'Set the current user\'s name'
                }
            ]
        })
    ]
});
```

The history extension adds several new methods to the store instance (highlighted above).


## Usage

### Options
The history extension method accepts an options object with the following properties:

- **max**: `number` - The maximum number of history steps to store. The default value is `50`.
- **mutations**: `object[]` - The mutations you wish to track. leaving this undefined will cause all mutations to be tracked. The default is undefined.
    - **name**: `string` - The name of the mutation to track. This must match the name of a registered mutation.
    - **description**: `string?` - An optional description of the mutations intentions. This is useful for displaying a list of commands in the UI.

### Undoing/Redoing mutations
To undo or redo a mutation simply call the `undo` or `redo` methods returned from the store instance.

## Considerations
Please keep the following points in mind when using this extension:

- This extension has a slight performance cost. Each tracked mutation is proxied and values are cloned pre/post mutation. If you are assigning/moving/deleting large object structures around state this cause a performance hit and increase in memory usage. It is recommended to keep mutations granular and precise when tracking them with the history (or trace) extension.
- This extension cannot handle untracked mutation side-effects. For example, say you have 2 mutations, `mutation1` and `mutation2`. Both mutations modify the same branch of state but `mutation1` is tracked by the history extension and `mutation2` is not. Undoing the changes from `mutation1` any time after running `mutation2` will cause changes from `mutation2` to be lost and unrecoverable.