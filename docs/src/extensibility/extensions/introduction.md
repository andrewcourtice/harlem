# Introduction

Extensions are per-store additions to Harlem's core functionaility. Extensions are often used for adding store features, changing store behaviour and various other low-level tasks. This is the primary method in which Harlem stores are extended.

Feel free to choose from some of the official extensions or write your own. See the [extensions documentation](extensions) from more information on the official set of extensions or how to author your own plugin.


## Official Extensions

Here is a list of officially supported Harlem plugins. These plugins are not designed to suit every use-case but instead add basic functionality for common use-cases.

- [Action](action.html) (`@harlem/extension-action`) - Extends a store to support cancellable async actions.
- [Compose](compose.html) (`@harlem/extension-compose`) - Extends a store to to add simple read/write convenience methods.
- [History (Preview)](history.html) (`@harlem/extension-history`) - Extends a store to support undo and redo capabilities.
- [Lazy](lazy.html) (`@harlem/extension-lazy`) - Extends a store to support lazy async getters.
- [Reset](reset.html) (`@harlem/extension-reset`) - Extends a store to support resetting a store back to it's original state.
- [Snapshot](snapshot.html) (`@harlem/extension-snapshot`) - Extends a store to support taking snapshots of state and applying it at a later stage.
- [Storage](storage.html) (`@harlem/extension-storage`) - Extends a store to support synchronising state to/from `localStorage` or `sessionStorage`.
- [Trace](trace.html) (`@harlem/extension-trace`) - Extends a store to support tracing granular changes to state during mutations. Useful for auditing during development.
- [Transaction](transaction.html) (`@harlem/extension-transaction`) - Extends a store to support rolling back multiple mutations if one fails.

If you require functionality to suit a specific use-case you can write your own extension. See [Writing your own extension](#writing-your-own-extension) below.

If you feel that there is a piece of common functionality that should be included as an official Harlem extension please open an issue providing a description of the extension, the intended API and, if possible, a working example in a codesandbox.


## Writing your own extension

Writing an extension for Harlem is very straightforward. An extension is simply a `function` that returns an `object` to be merged with the store instance. 

### Basic example

Let's take a look at a simple example:

```typescript
import type {
    InternalStore,
    BaseState,
} from '@harlem/core';

interface Options {
    option1: string;
    option2: number;
}

export default function resetExtension<TState extends BaseState>(options?: Options) {

    return (store: InternalStore<TState>) => {

        function doSomethingWithTheStore(input: string) {
            // do something
        }

        return {
            doSomethingWithTheStore
        };
    };
}
```

A store instance would then look like this:

```typescript{10}
const STATE = {
    firstName: 'John',
    lastName: 'Smith'
};

const {
    state,
    getter,
    mutation,
    doSomethingWithTheStore
} = createStore('user', STATE);
```


### Publishing your extension
To make it easy for users to find Harlem extensions it is recommended that you name your extension with a `harlem-extension-` prefix if publishing to the NPM registry.