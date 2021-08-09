# Harlem Snapshot Extension

![npm](https://img.shields.io/npm/v/@harlem/extension-snapshot)

This is the official snapshot extension for Harlem. The snapshot extension adds the ability to snapshot a store's state at a particular point in time and reapply it later. 

## Getting Started

Follow the steps below to get started using the snapshot extension.

### Installation

Before installing this extension make sure you have installed `@harlem/core`.

Install `@harlem/extension-snapshot`:
```
npm install @harlem/extension-snapshot
```
Or if you're using Yarn:
```
yarn add @harlem/extension-snapshot
```

### Registration

To get started simply register this extension with the store you wish to extend.

```typescript
import snapshotExtension from '@harlem/extension-snapshot';

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
    snapshot
} = createStore('example', STATE, {
    extensions: [
        snapshotExtension()
    ]
});
```

The snapshot extension adds a single `snapshot` method to the store instance.


## Usage

### Taking a snapshot
To take a snapshot simply call the `snapshot` method returned from the store instance at the point in time you want the snapshot to be in.

```typescript
const snap = snapshot();
```

The snapshot method also accepts an optional 2nd argument which is a function that returns a sub-branch of state. This is useful for taking more granular snapshots instead of the whole state tree.

```typescript
const snap = snapshot(state => state.details);
```

**Note**: The branch function **must** return an `object` type. The sub-branch cannot be an `array`, `date`, `string`, `number` etc.


### Applying a snapshot
To apply a snapshot, call the `apply` method on the snapshot instance.

```typescript
const snap = snapshot();

// Sometime later
snap.apply();
```

Once the snapshot is applied the state tree (or sub-branch) will be overwritten to what the snapshot was when it was taken. Any changes to state since the snapshot point will be lost.


### Using snapshotted state
Along with the `apply` method, the snapshot function returns a `state` object. This `state` object is a **readonly** copy of the state that was snapshotted.

```typescript
const snap = snapshot();

console.log(snap.state.firstName);
```