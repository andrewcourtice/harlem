# Harlem Plugins

At it's heart, Harlem uses a plugin system to extend functionality and create powerful additions to your stores.

<!-- TOC -->

- [Official plugins](#official-plugins)
- [Writing your own plugin](#writing-your-own-plugin)
    - [Basic example](#basic-example)
    - [Providing options](#providing-options)
    - [Publishing your plugin](#publishing-your-plugin)

<!-- /TOC -->

## Official plugins
Here is a list of officially support Harlem plugins. These plugins are not designed to suit every use-case but instead add basic functionality for common use-cases.

- [Devtools](devtools) (`@harlem/plugin-devtools`) - The devtools plugin adds Vue devtools integration with your stores to show updates to your state in realtime.
- [Reset](reset) (`@harlem/plugin-reset`) - The reset plugin provides an API to reset stores to their initial state.
- [Storage](storage) (`@harlem/plugin-storage`) - The storage plugin provides simple local/session storage synchronisation with your state. This plugin relieves the burden of having to manually save your state to a web storage resource.
- [Transactions](transaction) (`@harlem/plugin-transaction`) - The transaction plugin provides an API for defining transactions that run multiple mutations. A transaction can safely rollback mutations in the event of an error.

If you require functionality to suit a specific use-case you can write your own plugin. See [Writing your own plugin](#writing-your-own-plugin) below.

If you feel that there is a piece of common functionality that should be included as an official Harlem plugin please open an issue providing a description of the plugin, the intended API and, if possible, a working example in a codesandbox.


## Writing your own plugin
Writing your own plugin for Harlem is very straightforward. The plugin architecture mimics Vue's plugin system except for a few minor differences.


### Basic example
Here is an example of a Harlem plugin in it's most basic form:

```typescript
import type {
    HarlemPlugin
} from '@harlem/core';

export default {

    name: 'my-plugin',

    install(app, eventEmitter, stores) {
        // Your plugin logic here
    }

} as HarlemPlugin;
```

**Note:** If you're using Typescript it is recommended that you add `@harlem/core` as a devDependency and export your plugin object cast as a `HarlemPlugin` (as shown in the example above). This will give you full typing support when authoring your plugin.

As you can see the plugin is similar to Vue in that it has a single `install` method. Note however that Harlem plugins require a name field to identify your plugin and the install method has `eventEmitter` and `stores` args as opposed to `options`. 

The `eventEmitter` arg allows you to listen and react to store events such as mutations and errors. You can also emit events and listen to events emitted from other plugins.

The `stores` arg is a `Map` of all the registered store instances. In your plugin you have complete control to read it's state, enumerate getters/mutations, listen to events, and even reset or mutate state. Because plugins have so much control over the store be very careful not to cause unexpected side-effects to stores.

### Providing options

As you can see in the example above there is no obvious mechanism to accept options to your plugin. To accept options you can just export a function taking an `options` arg that returns your plugin instance. In fact, this is how the official Harlem plugins are designed.

```typescript
import type {
    HarlemPlugin
} from '@harlem/core';

interface Options {
    someOption: string;
    someOtherOption: boolean;
};

export default function(options: Options): HarlemPlugin {

    return {

        name: 'my-plugin',

        install(app, eventEmitter, stores) {
            // Your plugin logic here
        }

    };

};
```

### Publishing your plugin

To make it easy for users to find Harlem plugins it is recommended that you name your plugin with a `harlem-plugin-` prefix if publishing to the NPM registry.
