**[Harlem](../README.md)**

> [Globals](../README.md) / [@harlem/core](../modules/_harlem_core.md) / Store

# Class: Store\<T>

## Type parameters

Name | Type | Default |
------ | ------ | ------ |
`T` | object | any |

## Hierarchy

* **Store**

## Implements

* [InternalStore](../interfaces/_harlem_core.internalstore.md)\<T>

## Index

### Constructors

* [constructor](_harlem_core.store.md#constructor)

### Properties

* [getters](_harlem_core.store.md#getters)
* [mutations](_harlem_core.store.md#mutations)
* [name](_harlem_core.store.md#name)

### Accessors

* [state](_harlem_core.store.md#state)

### Methods

* [emit](_harlem_core.store.md#emit)
* [exec](_harlem_core.store.md#exec)
* [getter](_harlem_core.store.md#getter)
* [mutation](_harlem_core.store.md#mutation)
* [on](_harlem_core.store.md#on)
* [once](_harlem_core.store.md#once)

## Constructors

### constructor

\+ **new Store**(`name`: string, `state`: T): [Store](_harlem_core.store.md)

*Defined in [core/src/internal-store.ts:47](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/internal-store.ts#L47)*

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`state` | T |

**Returns:** [Store](_harlem_core.store.md)

## Properties

### getters

•  **getters**: Map\<string, Function>

*Implementation of [InternalStore](../interfaces/_harlem_core.internalstore.md).[getters](../interfaces/_harlem_core.internalstore.md#getters)*

*Defined in [core/src/internal-store.ts:46](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/internal-store.ts#L46)*

___

### mutations

•  **mutations**: Set\<string>

*Implementation of [InternalStore](../interfaces/_harlem_core.internalstore.md).[mutations](../interfaces/_harlem_core.internalstore.md#mutations)*

*Defined in [core/src/internal-store.ts:47](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/internal-store.ts#L47)*

___

### name

•  **name**: string

*Implementation of [InternalStore](../interfaces/_harlem_core.internalstore.md).[name](../interfaces/_harlem_core.internalstore.md#name)*

*Defined in [core/src/internal-store.ts:45](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/internal-store.ts#L45)*

## Accessors

### state

• get **state**(): [ReadState](../modules/_harlem_core.md#readstate)\<T>

*Defined in [core/src/internal-store.ts:58](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/internal-store.ts#L58)*

**Returns:** [ReadState](../modules/_harlem_core.md#readstate)\<T>

## Methods

### emit

▸ **emit**(`event`: string, `sender`: string, `data`: any): void

*Implementation of [InternalStore](../interfaces/_harlem_core.internalstore.md)*

*Defined in [core/src/internal-store.ts:62](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/internal-store.ts#L62)*

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

*Implementation of [InternalStore](../interfaces/_harlem_core.internalstore.md)*

*Defined in [core/src/internal-store.ts:120](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/internal-store.ts#L120)*

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

*Implementation of [InternalStore](../interfaces/_harlem_core.internalstore.md)*

*Defined in [core/src/internal-store.ts:80](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/internal-store.ts#L80)*

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

*Implementation of [InternalStore](../interfaces/_harlem_core.internalstore.md)*

*Defined in [core/src/internal-store.ts:110](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/internal-store.ts#L110)*

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

▸ **on**(`event`: string, `handler`: [EventHandler](../modules/_harlem_core.md#eventhandler)): [EventListener](../interfaces/_harlem_core.eventlistener.md)

*Defined in [core/src/internal-store.ts:72](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/internal-store.ts#L72)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_harlem_core.md#eventhandler) |

**Returns:** [EventListener](../interfaces/_harlem_core.eventlistener.md)

___

### once

▸ **once**(`event`: string, `handler`: [EventHandler](../modules/_harlem_core.md#eventhandler)): [EventListener](../interfaces/_harlem_core.eventlistener.md)

*Defined in [core/src/internal-store.ts:76](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/internal-store.ts#L76)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_harlem_core.md#eventhandler) |

**Returns:** [EventListener](../interfaces/_harlem_core.eventlistener.md)
