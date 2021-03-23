# Reset

![npm](https://img.shields.io/npm/v/@harlem/plugin-reset)

This is the official Harlem plugin for resetting stores to their initial state.

## Installation

Before installing the reset plugin make sure you have installed `@harlem/core`.

Install `@harlem/plugin-reset`:
```
npm install @harlem/plugin-reset
```
Or if you're using Yarn:
```
yarn add @harlem/plugin-reset
```

## Usage

Create an instance of the plugin and register it with Harlem:
```typescript
import App from './app.vue';

import harlem from '@harlem/core';
import createResetPlugin from '@harlem/plugin-reset';

createApp(App)
    .use(harlem, {
        plugins: [
            createResetPlugin()
        ]
    })
    .mount('#app');
```

Call the reset method with the name of the store you wish to reset:
```typescript
import {
    reset
} from '@harlem/plugin-reset';

export default function() {
    reset('my-store');
}
```
