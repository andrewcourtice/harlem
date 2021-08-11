# Reset Extension

![npm](https://img.shields.io/npm/v/@harlem/extension-reset)

This is the official reset extension for Harlem. The reset extension adds the ability to reset a store back to it's initial state.

## Getting Started

Follow the steps below to get started using the reset extension.

### Installation

Before installing this extension make sure you have installed `@harlem/core`.

Install `@harlem/extension-reset`:
```
npm install @harlem/extension-reset
```
Or if you're using Yarn:
```
yarn add @harlem/extension-reset
```

### Registration

To get started simply register this extension with the store you wish to extend.

```typescript
import resetExtension from '@harlem/extension-reset';

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
    reset
} = createStore('example', STATE, {
    extensions: [
        resetExtension()
    ]
});
```

The reset extension adds a single `reset` method to the store instance.


## Usage

### Resetting a store
to reset a store simply call the `reset` method returned from the store instance.