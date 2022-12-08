# Harlem Devtools Plugin

The devtools plugin integrates Harlem into the Vue developer tools allowing you to see and edit your stores in real-time.

## Installation

To get started make sure you have the Vue developer tools installed in your browser. The Vue devtools can be installed here:
- [Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Edge](https://microsoftedge.microsoft.com/addons/detail/vuejs-devtools/olofadcdnkkjdfgjcmjaadnlehnnihnl)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools)

Before installing the devtools plugin make sure you have installed `@harlem/core`.

```bash
yarn add @harlem/plugin-devtools
# or
npm install @harlem/plugin-devtools
```

The devtools extension is already included with Harlem when using the `harlem` package.


## Usage

Create an instance of the plugin and register it with Harlem:
```typescript
import App from './app.vue';
import devtoolsPlugin from '@harlem/plugin-devtools';

import {
    createVuePlugin
} from 'harlem';

createApp(App)
    .use(createVuePlugin({
        plugins: [
            devtoolsPlugin({
                label: 'My State'
            })
        ]
    }))
    .mount('#app');
```

3. Open your Vue devtools to see your stores.


### Options

- **label**: `string?` - the name that will appear in the Vue devtools pane. The default is 'Harlem'.
- **color**: `number?` - a Hexadecimal number indicating the color to be used on the timeline for Harlem events. The default is `0x40c48d`.

*(?) indicates an optional field*