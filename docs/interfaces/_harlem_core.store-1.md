**[Harlem](../README.md)**

> [Globals](../README.md) / [@harlem/core](../modules/_harlem_core.md) / Store

# Interface: Store\<T>

## Type parameters

Name |
------ |
`T` |

## Hierarchy

* [StoreBase](_harlem_core.storebase.md)\<T>

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

•  **state**: [ReadState](../modules/_harlem_core.md#readstate)\<T>

*Defined in [core/src/types.ts:53](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L53)*

## Methods

### destroy

▸ **destroy**(): void

*Defined in [core/src/types.ts:56](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L56)*

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

___

### on

▸ **on**(`event`: string, `handler`: [EventHandler](../modules/_harlem_core.md#eventhandler)): [EventListener](_harlem_core.eventlistener.md)

*Defined in [core/src/types.ts:54](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L54)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_harlem_core.md#eventhandler) |

**Returns:** [EventListener](_harlem_core.eventlistener.md)

___

### once

▸ **once**(`event`: string, `handler`: [EventHandler](../modules/_harlem_core.md#eventhandler)): [EventListener](_harlem_core.eventlistener.md)

*Defined in [core/src/types.ts:55](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L55)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_harlem_core.md#eventhandler) |

**Returns:** [EventListener](_harlem_core.eventlistener.md)
