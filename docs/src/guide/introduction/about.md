# About

Harlem is a simple, unopinionated, lightweight and extensible state management solution for Vue 3. It is designed to suit projects of all sizes and developers of all different levels of experience.

## Foundations

### Simple
Harlem has a simple functional API for creating, reading and mutating state. At it's heart, Harlem just uses Vue reactive objects and computeds which means if you know how to use Vue, you'll know how to use Harlem.

### Unopinionated
Harlem doesn't impose any standards or conventions on your codebase. Because of it's simple functional API you can structure your code anyway you want and Harlem will just work.

### Immutable
All state provided from a Harlem store is immutable by default. The only write access to state is through mutations. This ensures all updates to your store are tracable, thereby reducing the amount of bugs produced by code unpredictably mutating state.

### Lightweight
Harlem core weighs in at around 1.5KB (minified & gzipped) which makes it the perfect solution for codebases of all sizes. It is also designed to be tree-shakable - unused stores, getters, or mutations will be removed from your code at build time (provided you are using a build tool that supports tree-shaking). 

It's also worth noting that Harlem has **zero** dependencies.

### Extensible
Harlem is architectured with extensibility in mind so you can extend it any way you want through [plugins](/extensibility/plugins/) and [extensions](/extensibility/extensions/). Some of the official plugins and extensions include Vue devtools integration, local/session storage sync, snapshots, history (undo/redo) and more.

### Great DX
Harlem has a great developer experience. It's built using TypeScript so all of your state, getters, and mutations are strongly typed. Harlem also has devtools integration so you can explore your stores and see mutation events on the timeline in realtime.


## Features

### Powerfully simple

Harlem boasts a simple yet powerful API. The core package comes with everything you need to get started with state management such as state, getters and mutations.

By keeping the core feature set lightweight it means even the simplest project can use Harlem without incurring the cost of unneeded features.

Need more than the core set? Check out the great range of official [extensions](/extensibility/extensions/) and [plugins](/extensibility/plugins/) for adding features such as cancellable actions, resetting, lazy getters, devtools, ssr and more.

### TypeScript support
Harlem is built on TypeScript which means you get rich TypeScript support out of the box. Types can be automatically inferred nearly everywhere state is used, the only place you will have to explicitly define types is for payload objects.

```typescript
export const setFirstName = mutation<string>('setFirstName', (state, payload) => {
    state.firstName = payload;
});
```

Not using TypeScript? Not to worry - Harlem works just as well without it.


### Devtools integration

Harlem fully supports Vue devtools integration through the [Harlem devtools plugin](/extensibility/plugins/devtools). Install `@harlem/plugin-devtools` and register it with your Harlem plugin:

```typescript
import App from './app.vue';
import Harlem from '@harlem/core';

import createDevtoolsPlugin from '@harlem/plugin-devtools';

import {
    createApp
} from 'vue';

function start() {
    let plugins = [];

    if (process.env.NODE_ENV === 'development') {
        plugins.push(createDevtoolsPlugin({
            label: 'State'
        }));
    }

    return createApp(App)
        .use(Harlem, {
            plugins
        })
        .mount('#app');
}

start();
```

See the [devtools plugin docs](/extensibility/plugins/devtools) for more information on the options available. 

![Harlem Devtools](https://user-images.githubusercontent.com/11718453/95668309-aa5ade00-0bb5-11eb-99f5-1fea4d2061ff.gif)

*At the time of writing this you will need to use the Beta version of the Vue devtools.*


### Server-side rendering

Harlem supports using stores in an SSR application via the [SSR plugin](/extensibility/plugins/server-side-rendering) (`@harlem/plugin-ssr`). Refer to the SSR plugin documentation for more information and how to get started.