**[Harlem](../README.md)**

> [Globals](../README.md) / @harlem/core

# Module: @harlem/core

## Index

### References

* [Emittable](_harlem_core.md#emittable)
* [EventHandler](_harlem_core.md#eventhandler)
* [EventListener](_harlem_core.md#eventlistener)
* [EventPayload](_harlem_core.md#eventpayload)
* [Getter](_harlem_core.md#getter)
* [HarlemPlugin](_harlem_core.md#harlemplugin)
* [InternalStore](_harlem_core.md#internalstore)
* [InternalStores](_harlem_core.md#internalstores)
* [Mutation](_harlem_core.md#mutation)
* [MutationEventData](_harlem_core.md#mutationeventdata)
* [Mutator](_harlem_core.md#mutator)
* [Options](_harlem_core.md#options)
* [ReadState](_harlem_core.md#readstate)
* [Store](_harlem_core.md#store)
* [StoreBase](_harlem_core.md#storebase)
* [WriteState](_harlem_core.md#writestate)

### Classes

* [EventEmitter](../classes/_harlem_core.eventemitter.md)
* [Store](../classes/_harlem_core.store.md)

### Interfaces

* [Emittable](../interfaces/_harlem_core.emittable.md)
* [EventListener](../interfaces/_harlem_core.eventlistener.md)
* [EventPayload](../interfaces/_harlem_core.eventpayload.md)
* [HarlemPlugin](../interfaces/_harlem_core.harlemplugin.md)
* [InternalStore](../interfaces/_harlem_core.internalstore.md)
* [MutationEventData](../interfaces/_harlem_core.mutationeventdata.md)
* [Options](../interfaces/_harlem_core.options.md)
* [Store](../interfaces/_harlem_core.store-1.md)
* [StoreBase](../interfaces/_harlem_core.storebase.md)

### Type aliases

* [EventHandler](_harlem_core.md#eventhandler)
* [Getter](_harlem_core.md#getter)
* [InternalStores](_harlem_core.md#internalstores)
* [Mutation](_harlem_core.md#mutation)
* [Mutator](_harlem_core.md#mutator)
* [ReadState](_harlem_core.md#readstate)
* [WriteState](_harlem_core.md#writestate)

### Variables

* [SENDER](_harlem_core.md#sender)

### Functions

* [createStore](_harlem_core.md#createstore)
* [lockObject](_harlem_core.md#lockobject)

### Object literals

* [EVENTS](_harlem_core.md#events)
* [OPTIONS](_harlem_core.md#options)

## References

### Emittable

Re-exports: [Emittable](../interfaces/_harlem_core.emittable.md)

___

### EventHandler

Re-exports: [EventHandler](_harlem_core.md#eventhandler)

___

### EventListener

Re-exports: [EventListener](../interfaces/_harlem_core.eventlistener.md)

___

### EventPayload

Re-exports: [EventPayload](../interfaces/_harlem_core.eventpayload.md)

___

### Getter

Re-exports: [Getter](_harlem_core.md#getter)

___

### HarlemPlugin

Re-exports: [HarlemPlugin](../interfaces/_harlem_core.harlemplugin.md)

___

### InternalStore

Re-exports: [InternalStore](../interfaces/_harlem_core.internalstore.md)

___

### InternalStores

Re-exports: [InternalStores](_harlem_core.md#internalstores)

___

### Mutation

Re-exports: [Mutation](_harlem_core.md#mutation)

___

### MutationEventData

Re-exports: [MutationEventData](../interfaces/_harlem_core.mutationeventdata.md)

___

### Mutator

Re-exports: [Mutator](_harlem_core.md#mutator)

___

### Options

Re-exports: [Options](../interfaces/_harlem_core.options.md)

___

### ReadState

Re-exports: [ReadState](_harlem_core.md#readstate)

___

### Store

Re-exports: [Store](../interfaces/_harlem_core.store-1.md)

___

### StoreBase

Re-exports: [StoreBase](../interfaces/_harlem_core.storebase.md)

___

### WriteState

Re-exports: [WriteState](_harlem_core.md#writestate)

## Type aliases

### EventHandler

Ƭ  **EventHandler**\<T>: (payload?: [EventPayload](../interfaces/_harlem_core.eventpayload.md)\<T>) => void

*Defined in [core/src/types.ts:14](https://github.com/andrewcourtice/harlem/blob/24564e7/core/src/types.ts#L14)*

#### Type parameters:

Name | Default |
------ | ------ |
`T` | any |

___

### Getter

Ƭ  **Getter**\<T, U>: (state: [ReadState](_harlem_core.md#readstate)\<T>) => U

*Defined in [core/src/types.ts:10](https://github.com/andrewcourtice/harlem/blob/24564e7/core/src/types.ts#L10)*

#### Type parameters:

Name |
------ |
`T` |
`U` |

___

### InternalStores

Ƭ  **InternalStores**: Map\<string, [InternalStore](../interfaces/_harlem_core.internalstore.md)\<any>>

*Defined in [core/src/types.ts:13](https://github.com/andrewcourtice/harlem/blob/24564e7/core/src/types.ts#L13)*

___

### Mutation

Ƭ  **Mutation**\<T>: (payload?: T) => void

*Defined in [core/src/types.ts:12](https://github.com/andrewcourtice/harlem/blob/24564e7/core/src/types.ts#L12)*

#### Type parameters:

Name |
------ |
`T` |

___

### Mutator

Ƭ  **Mutator**\<T, U>: (state: [WriteState](_harlem_core.md#writestate)\<T>, payload?: U) => void

*Defined in [core/src/types.ts:11](https://github.com/andrewcourtice/harlem/blob/24564e7/core/src/types.ts#L11)*

#### Type parameters:

Name |
------ |
`T` |
`U` |

___

### ReadState

Ƭ  **ReadState**\<T>: DeepReadonly\<T>

*Defined in [core/src/types.ts:8](https://github.com/andrewcourtice/harlem/blob/24564e7/core/src/types.ts#L8)*

#### Type parameters:

Name |
------ |
`T` |

___

### WriteState

Ƭ  **WriteState**\<T>: UnwrapRef\<T>

*Defined in [core/src/types.ts:9](https://github.com/andrewcourtice/harlem/blob/24564e7/core/src/types.ts#L9)*

#### Type parameters:

Name |
------ |
`T` |

## Variables

### SENDER

• `Const` **SENDER**: \"core\" = "core"

*Defined in [core/src/constants.ts:5](https://github.com/andrewcourtice/harlem/blob/24564e7/core/src/constants.ts#L5)*

## Functions

### createStore

▸ **createStore**\<T>(`name`: string, `data`: T): [Store](../interfaces/_harlem_core.store-1.md)\<T>

*Defined in [core/src/index.ts:70](https://github.com/andrewcourtice/harlem/blob/24564e7/core/src/index.ts#L70)*

#### Type parameters:

Name | Type | Default |
------ | ------ | ------ |
`T` | object | any |

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`data` | T |

**Returns:** [Store](../interfaces/_harlem_core.store-1.md)\<T>

___

### lockObject

▸ **lockObject**\<T>(`input`: T, `exclusions`: keyof T[]): T

*Defined in [core/src/utilities.ts:1](https://github.com/andrewcourtice/harlem/blob/24564e7/core/src/utilities.ts#L1)*

#### Type parameters:

Name | Type |
------ | ------ |
`T` | object |

#### Parameters:

Name | Type |
------ | ------ |
`input` | T |
`exclusions` | keyof T[] |

**Returns:** T

## Object literals

### EVENTS

▪ `Const` **EVENTS**: object

*Defined in [core/src/constants.ts:11](https://github.com/andrewcourtice/harlem/blob/24564e7/core/src/constants.ts#L11)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`core` | object | { installed: string = "core:installed" } |
`mutation` | object | { after: string = "mutation:after"; before: string = "mutation:before"; error: string = "mutation:error" } |
`store` | object | { created: string = "store:created"; destroyed: string = "store:destroyed" } |

___

### OPTIONS

▪ `Const` **OPTIONS**: object

*Defined in [core/src/constants.ts:7](https://github.com/andrewcourtice/harlem/blob/24564e7/core/src/constants.ts#L7)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`plugins` | never[] | [] |
