# Harlem Action Extension

![npm](https://img.shields.io/npm/v/@harlem/extension-action)

This is the official action extension for Harlem. This extension adds action and action-related capabilities to your store. Some of the features of this extension are:

- Cancellable (incl. nested actions)
- Direct mutations within the action body - no need to specify a separate mutation
- Decoupled status checks through helper functions (`isActionRunning` and `hasActionRun`)

## Getting Started

### Installation

Before installing this extension make sure you have installed `@harlem/core`.

Install `@harlem/extension-action`:
```
npm install @harlem/extension-action
```
Or if you're using Yarn:
```
yarn add @harlem/extension-action
```

### Registration

To get started simply register this extension with the store you wish to extend.

```typescript{16-20,23}
import actionExtension from '@harlem/extension-action';

import {
    createStore
} from '@harlem/core';

const STATE = {
    firstName: 'Jane',
    lastName: 'Smith'
};

const {
    state,
    getter,
    mutation,
    action,
    hasActionRun,
    isActionRunning,
    whenActionIdle,
    clearActionRunCount
} = createStore('example', STATE, {
    extensions: [
        actionExtension()
    ]
});
```

Notice how the extension has added 5 new methods to the store instance: `action`, `hasActionRun`, `isActionRunning`, `whenActionIdle` and `clearActionRunCount`.


## Usage

### Defining an action
An action can be defined the same way you define any other core functionality (eg. `getter`, `mutation` etc.).

```typescript
export default action('load-user-data', async (id: number, mutate, controller) => {
    const userData = await fetch(`/api/user-data/${id}`, {
        signal: controller.signal
    });

    mutate(state => Object.assign(state.details.user, userData));
});
```

The action implementation is very similar to the core `mutation` method with some minor differences - The body of the action method is async, includes a `mutate` method and `controller` parameter.

You can also return data from the action body.

#### Mutate
The mutate method supplied to the action body is the equivilent of defining a mutation with the same name and no payload. This is convenient alternative to defining a seperate mutation.

The only parameter supplied to the `mutate` callback is a **writable** version of state.

#### Controller
The controller parameter supplied to the action body is an instance of an `AbortController`. The controller is used as a cancellation token for handling when the action is cancelled. This is particularly useful for termination `fetch` requests in actions.


### Specifying action options
The third argument to the action body is an options object.

```typescript
export default action('load-user-data', async (id: number, mutate, controller) => {
    ...
}, {
    parallel: true
});
```

- **parallel**: `boolean` - indicates whether this action allows multiple instances running in parallel. This is set to `false` by default meaning any instance of this action that starts while another is running will cause the already running action to abort.


### Calling an action
To call an action simply import it and call it with the payload (if a payload type is defined). 

```typescript
import {
    loadUserData
} from './actions';

async function runAction() {
    await loadUserData(85);
}
```


### Cancelling an action
Each time an action is called it returns an instance of a `Task` class. The `Task` class is an extension of the in-built `Promise` class that adds an `abort` method you can use to terminate the action.

```typescript
async function runAction() {
    const task = loadUserData(85);

    setTimeout(() => task.abort(), 1000);

    await task;
}
```

Cancelling the task will throw an `ActionAbortError`. It is recommended to wrap actions you intend on cancelling in a `try/catch` statement to handle this.


### Handling nested actions
Using nested actions is as simple as calling any other action(s) within the body of the current action. However to handle cancellation through nesting, the controller needs to be passed down to the nested instance(s).

```typescript{7-8}
import {
    childAction1,
    childAction2,
} from './child-actions';

export default action('parent-action', async (id: number, mutate, controller) => {
    await Promise.all([
        childAction1('payload', controller),
        childAction2('payload', controller),
    ]);
});
```

### Checking action status
This extension provides a set of helper methods for checking the status of actions. There are 2 ways to check whether an action is running:

- Direct
- Indirect

The **direct** method is simply awaiting the task that is returned from calling the action:

```typescript
async function runAction() {
    await loadUserData(85);
}
```

The **indirect** method is using the helper methods on the store to check whether the action is currently running or has run at all.

To check whether the action is currently running use the `isActionRunning` method:

```typescript
const isRunning = computed(() => isActionRunning('load-user-data'));
```

To check whether the action has run at all use the `isActionRunning` method:

```typescript
const isRunning = computed(() => hasActionRun('load-user-data'));
```

To respond to when an action becomes idle use the `whenActionIdle` method:
```typescript
await whenActionIdle('load-user-data');
```

All of these methods accept an optional predicate function as the second argument. The predicate function is used to check the status of a particular instance of that action. for example, say you call the same action with 2 different payloads:
```typescript
loadUserData(85);
loadUserData(88);

const isFirstActionRunning = isActionRunning('load-user-data', payload => payload === 85);
```

The predicate function is called with the payload for each instance of the action currently running. The function must return a boolean.