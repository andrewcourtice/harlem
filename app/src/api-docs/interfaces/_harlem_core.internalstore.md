**[Harlem](../README.md)**

> [Globals](../README.md) / [@harlem/core](../modules/_harlem_core.md) / InternalStore

# Interface: InternalStore\<TState>

## Type parameters

Name | Default |
------ | ------ |
`TState` | any |

## Hierarchy

* [StoreBase](_harlem_core.storebase.md)\<TState>

  ↳ **InternalStore**

## Implemented by

* [Store](../classes/_harlem_core.store.md)

## Index

### Properties

* [getters](_harlem_core.internalstore.md#getters)
* [mutations](_harlem_core.internalstore.md#mutations)
* [name](_harlem_core.internalstore.md#name)
* [state](_harlem_core.internalstore.md#state)

### Methods

* [emit](_harlem_core.internalstore.md#emit)
* [exec](_harlem_core.internalstore.md#exec)
* [getter](_harlem_core.internalstore.md#getter)
* [mutation](_harlem_core.internalstore.md#mutation)
* [write](_harlem_core.internalstore.md#write)

## Properties

### getters

•  **getters**: Map\<string, Function>

*Defined in [core/src/types.ts:46](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L46)*

___

### mutations

•  **mutations**: Map\<string, [Mutator](../modules/_harlem_core.md#mutator)\<TState, any, any>>

*Defined in [core/src/types.ts:47](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L47)*

___

### name

•  **name**: string

*Defined in [core/src/types.ts:45](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L45)*

___

### state

• `Readonly` **state**: [ReadState](../modules/_harlem_core.md#readstate)\<TState>

*Defined in [core/src/types.ts:44](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L44)*

## Methods

### emit

▸ **emit**(`event`: string, `sender`: string, `data`: any): void

*Defined in [core/src/types.ts:48](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L48)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`sender` | string |
`data` | any |

**Returns:** void

___

### exec

▸ **exec**\<TResult>(`name`: string, `payload?`: any): TResult

*Defined in [core/src/types.ts:49](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L49)*

#### Type parameters:

Name | Default |
------ | ------ |
`TResult` | void |

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`payload?` | any |

**Returns:** TResult

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

### write

▸ **write**\<TResult>(`name`: string, `sender`: string, `mutator`: [Mutator](../modules/_harlem_core.md#mutator)\<TState, undefined, TResult>): TResult

*Defined in [core/src/types.ts:50](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L50)*

#### Type parameters:

Name | Default |
------ | ------ |
`TResult` | void |

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`sender` | string |
`mutator` | [Mutator](../modules/_harlem_core.md#mutator)\<TState, undefined, TResult> |

**Returns:** TResult
