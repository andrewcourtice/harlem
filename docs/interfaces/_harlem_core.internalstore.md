**[Harlem](../README.md)**

> [Globals](../README.md) / [@harlem/core](../modules/_harlem_core.md) / InternalStore

# Interface: InternalStore\<T>

## Type parameters

Name | Default |
------ | ------ |
`T` | any |

## Hierarchy

* [StoreBase](_harlem_core.storebase.md)\<T>

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

## Properties

### getters

•  **getters**: Map\<string, Function>

*Defined in [core/src/types.ts:46](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L46)*

___

### mutations

•  **mutations**: Set\<string>

*Defined in [core/src/types.ts:47](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L47)*

___

### name

•  **name**: string

*Defined in [core/src/types.ts:45](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L45)*

___

### state

• `Readonly` **state**: [ReadState](../modules/_harlem_core.md#readstate)\<T>

*Defined in [core/src/types.ts:44](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L44)*

## Methods

### emit

▸ **emit**(`event`: string, `sender`: string, `data`: any): void

*Defined in [core/src/types.ts:48](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L48)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`sender` | string |
`data` | any |

**Returns:** void

___

### exec

▸ **exec**(`name`: string, `sender`: string, `mutator`: [Mutator](../modules/_harlem_core.md#mutator)\<T, undefined>): void

*Defined in [core/src/types.ts:49](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L49)*

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`sender` | string |
`mutator` | [Mutator](../modules/_harlem_core.md#mutator)\<T, undefined> |

**Returns:** void

___

### getter

▸ **getter**\<U>(`name`: string, `getter`: [Getter](../modules/_harlem_core.md#getter)\<T, U>): ComputedRef\<U>

*Inherited from [StoreBase](_harlem_core.storebase.md).[getter](_harlem_core.storebase.md#getter)*

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

*Inherited from [StoreBase](_harlem_core.storebase.md).[mutation](_harlem_core.storebase.md#mutation)*

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
