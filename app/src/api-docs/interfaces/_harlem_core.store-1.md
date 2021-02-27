**[Harlem](../README.md)**

> [Globals](../README.md) / [@harlem/core](../modules/_harlem_core.md) / Store

# Interface: Store\<TState>

## Type parameters

Name |
------ |
`TState` |

## Hierarchy

* [StoreBase](_harlem_core.storebase.md)\<TState>

  ↳ **Store**

## Index

### Properties

* [state](_harlem_core.store-1.md#state)

### Methods

* [destroy](_harlem_core.store-1.md#destroy)
* [getter](_harlem_core.store-1.md#getter)
* [mutation](_harlem_core.store-1.md#mutation)
* [on](_harlem_core.store-1.md#on)
* [once](_harlem_core.store-1.md#once)

## Properties

### state

•  **state**: [ReadState](../modules/_harlem_core.md#readstate)\<TState>

*Defined in [core/src/types.ts:54](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L54)*

## Methods

### destroy

▸ **destroy**(): void

*Defined in [core/src/types.ts:57](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L57)*

**Returns:** void

___

### getter

▸ **getter**\<TResult>(`name`: string, `getter`: [Getter](../modules/_harlem_core.md#getter)\<TState, TResult>): ComputedRef\<TResult>

*Inherited from [StoreBase](_harlem_core.storebase.md).[getter](_harlem_core.storebase.md#getter)*

*Defined in [core/src/types.ts:39](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L39)*

#### Type parameters:

Name |
------ |
`TResult` |

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`getter` | [Getter](../modules/_harlem_core.md#getter)\<TState, TResult> |

**Returns:** ComputedRef\<TResult>

___

### mutation

▸ **mutation**\<TPayload, TResult>(`name`: string, `mutator`: [Mutator](../modules/_harlem_core.md#mutator)\<TState, TPayload, TResult>): [Mutation](../modules/_harlem_core.md#mutation)\<TPayload, TResult>

*Inherited from [StoreBase](_harlem_core.storebase.md).[mutation](_harlem_core.storebase.md#mutation)*

*Defined in [core/src/types.ts:40](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L40)*

#### Type parameters:

Name | Default |
------ | ------ |
`TPayload` | - |
`TResult` | void |

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`mutator` | [Mutator](../modules/_harlem_core.md#mutator)\<TState, TPayload, TResult> |

**Returns:** [Mutation](../modules/_harlem_core.md#mutation)\<TPayload, TResult>

___

### on

▸ **on**(`event`: string, `handler`: [EventHandler](../modules/_harlem_core.md#eventhandler)): [EventListener](_harlem_core.eventlistener.md)

*Defined in [core/src/types.ts:55](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L55)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_harlem_core.md#eventhandler) |

**Returns:** [EventListener](_harlem_core.eventlistener.md)

___

### once

▸ **once**(`event`: string, `handler`: [EventHandler](../modules/_harlem_core.md#eventhandler)): [EventListener](_harlem_core.eventlistener.md)

*Defined in [core/src/types.ts:56](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L56)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_harlem_core.md#eventhandler) |

**Returns:** [EventListener](_harlem_core.eventlistener.md)
