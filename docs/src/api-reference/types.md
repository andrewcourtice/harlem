# Types

## Store Options

- **allowOverwrite**: `boolean` - A flag indicating whether this store or any of it's getters, mutations etc can be overwritten. Defaults to `true`.
- **providers**: `object` - A [StoreProviders](#store-providers) object with a set of providers for this store.
- **extensions**: `array` - An array of extensions to extend this store instance with.


## Store Providers
- **read**: `function` - A function to intercept readonly state before it is exposed from the store. Default is `state => state`.
- **write**: `function` - A function to intercept writable state before it is passed into mutations. Default is `state => state`.
- **payload**: `function` - A function to intercept a payload before it is passed into a mutation (or any extension that requests a payload). Default is `payload => clone(payload)`.

## EventListener

- **dispose**: `function` - A function for detaching the current event listener.


## EventPayload

- **sender**: `string` - The sender of this event (usually `core`).
- **store**: `string?` - The name of the store this event originated on.
- **data**: `any` - Any data related to the event.


## MutationEventData

- **mutation**: `string` - The name of the mutation.
- **payload?**: `any?` - The payload that the mutation was invoked with.
- **result?**: `any` - The result returned from the mutation.