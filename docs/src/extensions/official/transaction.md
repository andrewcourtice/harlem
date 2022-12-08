# Transaction Extension

The transaction extension adds the ability to rollback a set of mutations in the event of an error.

## Getting Started

Follow the steps below to get started using the transaction extension.

### Installation

Before installing this extension make sure you have installed `harlem`.

```bash
yarn add @harlem/extension-transaction
# or
npm install @harlem/extension-transaction
```

### Registration

To get started simply register this extension with the store you wish to extend.

```typescript{16-20,23}
import transactionExtension from '@harlem/extension-transaction';

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
    transaction,
    onBeforeTransaction,
    onAfterTransaction,
    onTransactionSuccess,
    onTransactionError,
} = createStore('example', STATE, {
    extensions: [
        transactionExtension()
    ]
});
```

The transaction extension adds several new methods to the store instance (highlighted above).


## Usage

### Defining a transaction
A transaction can be defined the same way you define any other core functionality (eg. `getter`, `mutation` etc.).

```typescript
export default transaction('my-transaction', (payload, mutate) => {
    /*
    Any mutations run during this method
    will be rolled back if an error occurs
    */
});
```

::: warning
- This extension comes with a performance cost. The entire state tree is cloned and stored before a transaction is run in order to rollback in the event of an error.
- This extension does not protect against issues attempting to roll back state in async scenarios
:::