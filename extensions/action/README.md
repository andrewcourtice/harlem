# Harlem Action Extension

The action extension adds advanced action capabilities to your store. Some features of this extension are:

- Cancellable (incl. nested actions)
- Customizable action instance deduplication
- Direct mutations within the action body - no need to specify a separate mutation
- Decoupled status checks through helper functions (`isActionRunning`, `hasActionRun`, and `whenActionIdle`)
- Automatic error capturing and error status checking through helper functions (`hasActionFailed`, `getActionErrors`)

## Getting Started

Follow the steps below to get started using the action extension.

### Installation

Before installing this extension make sure you have installed `harlem`.

```bash
yarn add @harlem/extension-action
# or
npm install @harlem/extension-action
```

### Registration

To get started simply register this extension with the store you wish to extend.

```typescript
import actionExtension, {
    ABORT_STRATEGY
} from '@harlem/extension-action';

import {
    createStore
} from 'harlem';

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
    hasActionFailed,
    getActionErrors,
    whenActionIdle,
    resetActionState,
    abortAction,
    onBeforeAction,
    onAfterAction,
    onActionSuccess,
    onActionError,
} = createStore('example', STATE, {
    extensions: [
        actionExtension({
            strategies: {
                abort: ABORT_STRATEGY.error
            }
        })
    ]
});
```

The action extension adds several new methods to the store instance (highlighted above).


## Usage

### Options
The action extension method accepts an options object with the following properties:
- **concurrent**: `boolean | function` - Whether to apply concurrency to all actions on this store. This can also be a function to customize how concurrent instances are handled.
- **strategies**: `object` - A set of custom strategies to apply globally to all actions. See [Changing action strategies](#changing-action-strategies).

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
The mutate method supplied to the action body is the equivilent of defining a mutation with the same name and no payload. This is a convenient alternative to defining a separate mutation.

The only parameter supplied to the `mutate` callback is a **writable** version of state.

#### Controller
The controller parameter supplied to the action body is an instance of an `AbortController`. The controller is used as a cancellation token for handling when the action is cancelled. This is particularly useful for terminating `fetch` requests in actions.


### Specifying action options
The third argument to the action body is an options object.

```typescript
export default action('load-user-data', async (id: number, mutate, controller) => {
    ...
}, {
    concurrent: true,
    autoClearErrors: true
});
```

- **concurrent**: `boolean | function` - indicates whether this action allows multiple instances running in parallel. Default is `true`.
- **autoClearErrors**: `boolean` - indicates whether any currently stored errors for this action should be cleared upon a new instance starting. Default is `true`.


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
There are 2 ways to cancel a running action:

- Direct
- Indirect

The **direct** method is simply calling the action and then calling the `abort` method. Each time an action is called it returns an instance of a `Task` class. The `Task` class is an extension of the in-built `Promise` class that adds an `abort` method you can use to terminate the action.

```typescript
async function runAction() {
    const task = loadUserData(85);

    setTimeout(() => task.abort(), 1000);

    await task;
}
```

The **indirect** method is using the helper method on the store to cancel the action by name.

```typescript
abortAction('load-user-data');
```

By default, cancelling the task will throw an `ActionAbortError` where the action is executed. It is recommended to wrap actions you intend on cancelling (or that are not parallel) in a `try/catch` statement to handle this. To change this behaviour see [Changing action strategies](#changing-action-strategies).


### Handling nested actions
Using nested actions is as simple as calling any other action(s) within the body of the current action. However, to handle cancellation through nesting, the parent `controller` needs to be passed down to the nested instance(s).

```typescript
import {
    childAction1,
    childAction2,
} from './child-actions';

export default action('parent-action', async (id: number, mutate, controller, onAbort) => {
    await Promise.all([
        childAction1('payload', controller),
        childAction2('payload', controller),
    ]);
});
```

Cancelling nested actions with a shared controller will cause all other actions sharing that controller to also abort. If this behaviour is not intended, use the `onAbort` method in the action body to manually cancel actions when necessary.


### Checking action status
This extension provides a set of helper methods for checking the status of actions. Similar to cancelling an action, there are 2 ways to check whether an action is running:

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

The predicate function is called with the payload for each instance of the action currently running. The predicate function must return a boolean.


### Handling action errors
A few methods are available for handling errors that occur within actions.

To check whether an action has failed use the `hasActionFailed` method:

```typescript
const hasFailed = computed(() => hasActionFailed('load-user-data'));
```

To get a list of errors for this action use the `getActionErrors` method:

```typescript
const errors = getActionErrors('load-user-data');
```

The list of errors is an array of objects with an **id**: `symbol` property and a **error**: `unknown` property. The id is the unique identifier for the instance this error occurred on.


### Customizing action concurrency

The default behaviour for action concurrency is to allow any instance of an action to run in parallel. This behaviour can be customized at a store level or per action. Here is the action behaviour based on the value of the `concurrent` option:

- `true`: Allow all instances of actions of the same name to run in parallel.
- `false`: Whenever a new instance of an action of the same name starts, cancel any currently running actions of the same name. This is useful for eliminating duplicate workloads and cancelling unnecessary network requests.
- `function`: A custom function that returns a `boolean` indicating whether this action should cancel all running instances. This is useful for pseudo-memoizing actions called with identical payloads.

#### Cancelling actions with duplicate payload inputs
As mentioned above the function value of the `concurrent` option is useful for cancelling any instance of an action that has been called with the same payload as an already running instance:

```typescript
export default action('load-user-data', async (id: number, mutate, controller) => {
    const userData = await fetch(`/api/user-data/${id}`, {
        signal: controller.signal
    });

    mutate(state => Object.assign(state.details.user, userData));
}, {
    concurrent: (currentPayload, runningPayloads) => !runningPayloads.includes(currentPayload)
});
```

For a deeper payload equality check (especially on object payload types) use a deep equality method like [Lodash's isEqual function](https://lodash.com/docs/4.17.15#isEqual). 


### Customizing action strategies
Each action has a set of strategies it executes in order to complete a set workload. The most common strategy is the abort strategy. The abort strategy indicates how the action should handle cancellation. By default, when an action is cancelled (or new instance started on a non-parallel action) an `ActionAbortError` is thrown.

The abort strategy can be overridden either per-action (via action options) or globally for all actions (via the extension options).

```typescript
import {
    ABORT_STRATEGY
} from '@harlem/extension-action';

export default action('load-user-data', async (id: number, mutate, controller) => {
    ...
}, {
    strategies: {
        // specify a custom abort action
        abort: (name, instanceId, resolve, reject, reason) => reject(reason)

        // or use a predefined one from Harlem
        // the default strategy is ABORT_STRATEGY.error
        abort: ABORT_STRATEGY.warn
    }
});
```

The abort strategy function is called with the following arguments:
- **name**: `string` - The name of the action.
- **instanceId**: `symbol` - The unique id of the action instance that was cancelled.
- **resolve**: `function` - A function to resolve the task and consider the action execution succussful.
- **reject**: `function` - A function to reject the task and consider the action execution unsuccussful.
- **reason**: `any` - The reason the action was aborted.

A custom abort strategy function **must** call either `resolve` or `reject` (recommended) synchronously. 

Changing the abort strategy is **not recommended**! This option is provided for advanced use-cases. Changing the abort strategy has a significant impact on action workflow, especially parent-child action cancellation.

### Using triggers
Action triggers are used the same way mutation triggers are with the only difference being using the action name as opposed to the mutation name. See the [triggers documentation](/guide/core-concepts/triggers) for more details.