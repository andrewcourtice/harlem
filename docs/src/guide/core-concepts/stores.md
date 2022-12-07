# Stores

In a nutshell a store is just a mechanism for storing, retrieving and mutating related data. 

Harlem, much like Vuex, follows a Redux-like state management pattern. Harlem's functionality can be divided into 4 main concepts:
- **State** - The single source of truth for your data (read-only). See [State](/guide/core-concepts/state).
- **Getters** - Computed derivation of mutations to state (read-only). See [Getters](/guide/core-concepts/getters).
- **Mutations** - The means by which state is changed (read/write). See [Mutations](/guide/core-concepts/mutations).
- **Actions** - Async methods for batching mutations, api requests etc (async read/write). [Actions](/guide/core-concepts/actions).

Advanced actions are available with the [action extension](/extensions/official/action) (@harlem/extension-action).

Where Harlem differs from Vuex is that as opposed to having one monolithic state tree, Harlem uses the concept of individual stores to create logical boundaries between disparate data.

Instead of defining store functions (getters, mutations etc) on a single object, Harlem uses a more functional approach which allows you to structure your codebase any way you like. The added benefit to this approach is that your stores can be tree-shaken not just at store level but right down to a getter/mutation/action level.

::: tip
Although mutations are a core foundational concept of Harlem, they are purely optional when using actions as actions provide a mechanism for mutating state directly within the action body while still being auditable by devtools.
:::


## Defining a store

To define a store all you need is a name and some initial state.

```typescript
import {
    createStore
} from 'harlem';

export default createStore('user', {
    firstName: 'John',
    lastName: 'Smith'
});
```

## Specifying options

You can specifiy a range of options when creating a store. This is most useful for adding any extensions you wish to include with this store. For the complete set of options available refer to the [API documentation](/api/).

```typescript
import {
    createStore
} from 'harlem';

export default createStore('user', STATE, {
    allowOverwrite: true,
    extensions: [
        composeExtension()
    ]
});
```