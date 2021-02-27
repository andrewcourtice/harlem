**[Harlem](../README.md)**

> [Globals](../README.md) / [@harlem/core](../modules/_harlem_core.md) / StoreBase

# Interface: StoreBase\<TState>

## Type parameters

Name |
------ |
`TState` |

## Hierarchy

* **StoreBase**

  ↳ [InternalStore](_harlem_core.internalstore.md)

  ↳ [Store](_harlem_core.store-1.md)

## Index

### Methods

* [getter](_harlem_core.storebase.md#getter)
* [mutation](_harlem_core.storebase.md#mutation)

## Methods

### getter

▸ **getter**\<TResult>(`name`: string, `getter`: [Getter](../modules/_harlem_core.md#getter)\<TState, TResult>): ComputedRef\<TResult>

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
