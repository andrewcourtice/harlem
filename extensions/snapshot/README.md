<p align="center">
    <a href="https://harlemjs.com">
        <img src="https://raw.githubusercontent.com/andrewcourtice/harlem/main/docs/src/.vuepress/public/assets/images/logo-192.svg" alt="Harlem"/>
    </a>
</p>

# Harlem Snapshot Plugin

![npm](https://img.shields.io/npm/v/@harlem/plugin-snapshot)

This is the official Harlem plugin for taking state snapshots and applying them when convenient.

<!-- TOC depthfrom:2 -->

- [Getting started](#getting-started)

<!-- /TOC -->

## Getting started

Before installing the snapshot plugin make sure you have installed `@harlem/core`.

1. Install `@harlem/plugin-snapshot`:
```
npm install @harlem/plugin-snapshot
```
Or if you're using Yarn:
```
yarn add @harlem/plugin-snapshot
```

2. Create an instance of the plugin and register it with Harlem:
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

3. Call the snapshot method with the name of the store you wish to snapshot:
```typescript
import {
    snapshot
} from '@harlem/plugin-snapshot';

export default function() {
    const snap = snapshot('my-store');

    // ...
}
```

4. Apply the snapshot:
```typescript
const snap = snapshot('my-store');

snap.apply(); // Apply the snapshot over the top of current state
snap.apply(true) // Replace state with the current snapshot
```