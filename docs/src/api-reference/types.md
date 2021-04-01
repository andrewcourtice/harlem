# Types

## EventListener

- **dispose** `function` - A function for detaching the current event listener


## EventPayload

- **sender** `string` - The sender of this event (usually `core`)
- **store** `string?` - The name of the store this event originated on
- **data** `any` - Any data related to the event


## MutationEventData

- **mutation** `string` - The name of the mutation
- **payload?** `any?` - The payload that the mutation was invoked with
- **result?** `any` - The result returned from the mutation