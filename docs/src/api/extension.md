---
sidebarDepth: 2
---

# Extension API

## InternalStore

### name
The name of the store.

- Type: `readonly string`


### register
Register a value with the store. This is used to register things like getters, mutations, actions etc. Any registered with the store will be visible in the devtools plugin.

- Type: `function`
- Arguments:
    - **group** `string` - The group to register this item under (eg. getters, mutations etc.).
    - **name** `string` - The name of this registration.
    - **valueProducer** `function` - A function which returns the value of this registration. This value is what will be displayed next to the item's name in the devtools.
        - Returns: `unknown`
    - **type?** `string` - An optional type. Values are `ref`, `reactive`, `computed` or `other`. Default is `other`.
- Returns: `void`


### unregister
Unregister a previously registered item from the store.

- Type: `function`
- Arguments:
    - **group** `string` - The group this item was registered under.
    - **name** `string` - The name of this registration.
- Returns: `void`


### emit
Emit an event from this store.

- Type: `function`
- Arguments:
    - **event** `string` - The name of this event.
    - **sender** `string` - The name of the event source (eg. 'extension:action').
    - **data** `any` - A data payload to emit with the event.
- Returns: `void`


### on
Subscribe to an event emitted from this store.

- Type: `function`
- Arguments:
    - **event** `string` - The name of this event.
    - **callback** `function` - A callback to execute when this event is triggered
        - Arguments:
            - s
        - Returns: `void`
- Returns: [EventListener]()


### once
This method is exactly the same as [on](#on) except that it only executes once and automatically disposes.


### track
Register a reactive effect with this store so that it is disposed when the store is destroyed. This is a wrapper for Vue's [effectScope](https://v3.vuejs.org/api/effect-scope.html) API.

- Type: `function`
- Arguments:
    - **callback** `function` - A function that creates an effect and optionally returns a value.
- Returns: `unknown`