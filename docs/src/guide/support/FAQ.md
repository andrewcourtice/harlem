# FAQ

## Why does Harlem still have Mutations?
Mutations are a key concept of Harlem. They are foundational in providing functionality for actions, triggers, devtools, tracing, and extension/plugin integration. That being said, although they are a core *concept*, they are not *mandatory*. You can author your stores entirely using actions without explicitly defining mutations and still have all the benefits of triggers, devtools etc.


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

See the Vue documentation on computeds for more information. [Vue Computed](https://v3.vuejs.org/api/computed-watch-api#computed).


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

## Is Harlem suitable for large projects?

Absolutely! Harlem is currently being used by [Fathom](https://www.fathomhq.com/) to power their extensive financial intelligence product. The Fathom implementation consists of several stores with hundreds of getters, mutations and actions.

If you are using Harlem in a large project and would be comfortable in sharing your experience, please let me know.