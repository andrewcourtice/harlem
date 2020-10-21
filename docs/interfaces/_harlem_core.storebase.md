**[Harlem](../README.md)**

> [Globals](../README.md) / [@harlem/core](../modules/_harlem_core.md) / StoreBase

# Interface: StoreBase\<T>

## Type parameters

Name |
------ |
`T` |

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

▸ **getter**\<U>(`name`: string, `getter`: [Getter](../modules/_harlem_core.md#getter)\<T, U>): ComputedRef\<U>

*Defined in [core/src/types.ts:39](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L39)*

#### Type parameters:

Name |
------ |
`U` |

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`getter` | [Getter](../modules/_harlem_core.md#getter)\<T, U> |

**Returns:** ComputedRef\<U>

___

### mutation

▸ **mutation**\<U>(`name`: string, `mutator`: [Mutator](../modules/_harlem_core.md#mutator)\<T, U>): [Mutation](../modules/_harlem_core.md#mutation)\<U>

*Defined in [core/src/types.ts:40](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L40)*

#### Type parameters:

Name |
------ |
`U` |

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`mutator` | [Mutator](../modules/_harlem_core.md#mutator)\<T, U> |

**Returns:** [Mutation](../modules/_harlem_core.md#mutation)\<U>
