# FAQ

## What about actions?
Harlem doesn't provide a mechanism for actions - this is by design. Actions are commonly asynchronous methods that contain business logic which group a single mutation or set of mutations together. Harlem leaves your action design up to you. Here is a simple example of an action using Harlem:

``` typescript
import {
    setLoading,
    setUserDetails
} from './mutations';

export async function loadUserDetails(userId) {
    setLoading(true);

    try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();

        setUserDetails(data);
    } finally {
        setLoading(false);
    }
}
```


## Can I share state between stores?
Certainly - just import the state or getter from one store into the getter you are authoring on another store. For example:

```typescript
import {
    state as otherState
} from '../other-store;

import {
    getter
} from './store';

export const myNumberGetter = getter('myNumber', state => state.myNumber +  otherState.otherNumber);
```

This also works for importing getters from other stores. Just remember that to access the value of a getter you will need to use the `.value` property of the getter. For example, if I had a getter name `myGetter` and I wanted to use it in another getter I would have to use `myGetter.value` to access it's raw value. 

See the Vue documentation on computeds for more information. [Vue Computed](https://v3.vuejs.org/api/computed-watch-api.html#computed).


## Does Harlem have a file structure convention for stores?
Short answer, no. Because Harlem attempts to be as unonpinionated as possible that means it's up to you to structure your store how you see fit. That being said here are 2 examples that may give you a headstart:

### Single file structure
```
- stores
    - store1
        state.js
        getters.js
        mutations.js
        actions.js
        store.js
        index.js
    - store2
        state.js
        getters.js
        mutations.js
        actions.js
        store.js
        index.js
```

### Multi-file structure
```
- stores
    - store1
        - getters
            getter-1.js
            getter-2.js
        - mutations
            mutation-1.js
            mutation-2.js
        - actions
            action-1.js
            action-2.js
        state.js
        store.js
        index.js
    - store2
        - getters
            getter-1.js
            getter-2.js
        - mutations
            mutation-1.js
            mutation-2.js
        - actions
            action-1.js
            action-2.js
        state.js
        store.js
        index.js
```

In both cases the `store.js` file and the `index.js` files would look roughly the same.

```typescript
// store.js

import STATE from './state';

import {
    createStore
} from '@harlem/core';

export const {
    state,
    getter,
    mutation,
    ...store
} = createStore('store1', STATE);
```

```typescript
// index.js - single file structure

export { state } from './store';

export {
    getter1,
    getter2
} from './getters';

export {
    mutation1,
    mutation2
} from './mutations';
```

```typescript
// index.js - multi-file structure

export { state } from './store';

export { default as getter1 } from './getters/getter-1';
export { default as getter2 } from './getters/getter-2';

export { default as mutation1 } from './mutations/mutation-1';
export { default as mutation2 } from './mutations/mutation-2';
```