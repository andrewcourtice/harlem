# Developer Experience

## TypeScript Support

Harlem is built on TypeScript which means you get a rich typing experience out-of-the-box. All of your stores state and methods are strongly typed so you have extra safety when building out your stores.

To get the best TypeScript experience with Harlem it is recommeded to enable `strict` mode in your `tsconfig.json` file (if you are able to do so):

```json
// tsconfig.json
{
    "strict": true
}
```


## Developer Tools

Harlem also has a [devtools plugin](/plugins/official/devtools) which allows you to view your stores, inspect & edit state, reset stores, and view events on the timeline in the Vue developer tools.

To get started make sure you have the Vue developer tools installed in your browser. The Vue devtools can be installed here:
- [Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Edge](https://microsoftedge.microsoft.com/addons/detail/vuejs-devtools/olofadcdnkkjdfgjcmjaadnlehnnihnl)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools)

Once you have the Vue devtools installed, install the Harlem devtools plugin:

```bash
yarn add @harlem/plugin-devtools
# or
npm install @harlem/plugin-devtools
```

After installing the devtools plugin register it with Harlem when attaching the Harlem Vue plugin:

```typescript
import App from './app.vue';
import devtoolsPlugin from '@harlem/plugin-devtools';

import {
    createVuePLugin
} from '@harlem/core';

createApp(App)
    .use(createVuePlugin({
        plugins: [
            devtoolsPlugin()
        ]
    }))
    .mount('#app');
```

::: tip 
Be sure to conditionally remove the devtools plugin in production builds to prevent shipping unnecessary code.
:::