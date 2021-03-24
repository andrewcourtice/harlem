# Snapshot

![npm](https://img.shields.io/npm/v/@harlem/plugin-snapshot)

This is the official Harlem plugin for taking state snapshots and applying them when convenient.

## Installation

Before installing the snapshot plugin make sure you have installed `@harlem/core`.

Install `@harlem/plugin-snapshot`:
```
npm install @harlem/plugin-snapshot
```
Or if you're using Yarn:
```
yarn add @harlem/plugin-snapshot
```

## Usage

Create an instance of the plugin and register it with Harlem:
```typescript
import App from './app.vue';

import harlem from '@harlem/core';
import createSnapshotPlugin from '@harlem/plugin-snapshot';

createApp(App)
    .use(harlem, {
        plugins: [
            createSnapshotPlugin()
        ]
    })
    .mount('#app');
```

Call the snapshot method with the name of the store you wish to snapshot:
```typescript
import {
    snapshot
} from '@harlem/plugin-snapshot';

export default function() {
    const snap = snapshot('my-store');

    // ...
}
```

Apply the snapshot:
```typescript
const snap = snapshot('my-store');

snap.apply(); // Apply the snapshot over the top of current state
snap.apply(true) // Replace state with the current snapshot
```