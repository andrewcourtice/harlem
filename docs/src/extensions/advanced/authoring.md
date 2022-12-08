# Writing your own extension

Writing an extension for Harlem is very straightforward. An extension is simply a `function` that returns an `object` to be merged with the store instance. 

## Basic example

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


## Publishing your extension
To make it easy for users to find Harlem extensions it is recommended that you name your extension with a `harlem-extension-` prefix if publishing to the NPM registry.