# Triggers

Triggers allow you to react to global or specific store events. Harlem uses an event-driven model to remain fast and lean while still providing flexible plugin hooks. The upside to this is that you can hook into specific Harlem events and react to them.

Triggers are particularly useful for reacting to certain mutations to perform async tasks. For instance, a trigger would allow you to send state back to a server after certain mutations.

## Store Triggers

```typescript
const {
    on,
    once,
    onBeforeMutation,
    onAfterMutation,
    onMutationSuccess,
    onMutationError,
} = createStore('user', STATE);

onMutationSuccess('my-mutation-name', event => {
    saveState();
});
```

The `on` function takes a single event name and a callback and returns an `EventListener` object with a single `dispose` method on it for detaching the listener.

The `event` payload has the following definition:

```typescript
interface EventPayload<TData> {
    sender: string; // The event source (ie. core, devtools etc)
    store: string; // The name of the store this event originated on
    data: TData; // Any data related to this event
}
```

The `data` property varies between events however for all mutation events the `data` object has the following definition:

```typescript
interface MutationEventData<TPayload, TResult> {
    mutation: string; // The name of the mutation that occurred
    payload: TPayload; // The payload sent to the mutation
    result?: TResult; // The result returned from the mutation.
}
```

The `result` property will be `undefined` for the `mutation:before` event or if the mutation does not return a result.


## Global Triggers

The same trigger logic above can be used for global triggers using the `on` event from `@harlem/core` as opposed to from a specific store.

```typescript
import {
    EVENTS,
    createStore,
    on,
    once
} from '@harlem/core';

const STATE = {
    firstName: 'John',
    lastName: 'Smith'
};

const store = createStore('user', STATE);

on(EVENTS.mutation.before, event => console.log(event));
on(EVENTS.mutation.after, event => console.log(event));
on(EVENTS.mutation.error, event => console.log(event));
```

## See also

[On](/api-reference/#on) API Reference