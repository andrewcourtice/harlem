# Stores

In a nutshell a store is just a mechanism for storing, retrieving and mutating related data. 

Harlem, much like Vuex, follows a Redux-like state management pattern. Harlem's functionality can be divided into 3 main concepts:
- **State** - The single source of truth for your data (read-only). See [State](/guide/core-concepts/state.html).
- **Getters** - Computed side-effects of mutations to state (read-only). See [Getters](/guide/core-concepts/getters.html).
- **Mutations** - The means by which state is changed (read/write). See [Mutations](/guide/core-concepts/mutations.html).

**Actions** (available via the [Action extension](/extensibility/extensions/action.html)) are also a major part of a modern state management solution. Harlem's action implementation can be described as cancellable async methods for batching mutations, api requests etc (async read/write). Refer to the [FAQ section](/guide/support/FAQ.html#why-aren-t-actions-included-by-default) to see why actions aren't included in the core package by default.

Where Harlem differs from Vuex is that as opposed to having one monolithic state tree, Harlem uses the concept of stores to create logical boundaries between disparate data.

Instead of defining store functions (getters, mutations etc) on a single object Harlem uses a more functional approach which allows you to structure your codebase any way you like. The added benefit to this approach is that your stores can be tree-shaken not just at store level but right down to a getter/mutation level.

**Note:** *Although mutations are a core foundational concept of Harlem, they are purely optional when using the action extension as the action extension provides a mechanism for mutating state directly within the action body while still being auditable by devtools.*


## Defining a store

To define a store all you need is a name, some initial state.

```typescript
import {
    createStore
} from '@harlem/core';

export default createStore('user', {
    firstName: 'John',
    lastName: 'Smith'
});
```

## Specifying options

You can specifiy a range of options when creating a store. This is most useful for adding any extensions you wish to include with this store. For the complete set of options available refer to the [API documentation](/api/global.html#createstore).

```typescript
import {
    createStore
} from '@harlem/core';

export default createStore('user', STATE, {
    allowOverwrite: true,
    extensions: [
        actionExtension()
    ]
});
```