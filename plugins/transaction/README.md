<p align="center">
    <a href="https://harlemjs.com">
        <img src="https://raw.githubusercontent.com/andrewcourtice/harlem/main/app/src/.vuepress/public/assets/images/logo-192.svg" alt="Harlem"/>
    </a>
</p>

# Harlem Transaction Plugin

![npm](https://img.shields.io/npm/v/@harlem/plugin-transaction)

This is the official Harlem plugin for adding transactions to your stores. This plugin works similar to a SQL Database transaction in that if an error occurs during the transaction, all mutations that have taken place will be rolled-back.

This is particularly useful for updating state in multiple stores or multiple branches in the same store at the same time.

<!-- TOC depthfrom:2 -->

- [Getting started](#getting-started)

<!-- /TOC -->

## Getting started

Before installing the transaction plugin make sure you have installed `@harlem/core`.

1. Install `@harlem/plugin-transaction`:
```
npm install @harlem/plugin-transaction
```
Or if you're using Yarn:
```
yarn add @harlem/plugin-transaction
```

2. Create an instance of the plugin and register it with Harlem:
```typescript
import App from './app.vue';

import harlem from '@harlem/core';
import createTransactionPlugin from '@harlem/plugin-transaction';

createApp(App)
    .use(harlem, {
        plugins: [
            createTransactionPlugin()
        ]
    })
    .mount('#app');
```

3. Define a transaction that utilises multiple mutations:
```typescript
import {
    transaction
} from '@harlem/plugin-transaction';

import {
    setUserDetails,
    setUserPermissions
} from './mutations';

import {
    getUserDetails,
    getUserPermissions
} from './services';

/*
The setUserPermissions has an error in it causing
the transaction to fail in which case the user details
mutation will be rolled back.
*/
const setUserData = transaction('setUserData', payload => {
    const {
        details,
        permissions
    } = payload;

    setUserDetails(details);
    setUserPermissions(permissions);
});

/*
Here is an example action that loads some data
about a user and updates the store
*/
export async function loadUserData(userId) {
    const [
        details,
        permissions
    ] = await Promise.all([
        getUserDetails(userId),
        getUserPermissions(userId),
    ]);

    setUserData({
        details,
        permissions
    });
}
```
