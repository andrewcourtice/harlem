**[Harlem](../README.md)**

> [Globals](../README.md) / [@harlem/core](../modules/_harlem_core.md) / Store

# Class: Store\<TState>

## Type parameters

Name | Type | Default |
------ | ------ | ------ |
`TState` | object | any |

## Hierarchy

* **Store**

## Implements

* [InternalStore](../interfaces/_harlem_core.internalstore.md)\<TState>

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
* [write](_harlem_core.store.md#write)

## Constructors

### constructor

\+ **new Store**(`name`: string, `state`: TState): [Store](_harlem_core.store.md)

*Defined in [core/src/store.ts:47](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L47)*

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`state` | TState |

**Returns:** [Store](_harlem_core.store.md)

## Properties

### getters

•  **getters**: Map\<string, Function>

*Implementation of [InternalStore](../interfaces/_harlem_core.internalstore.md).[getters](../interfaces/_harlem_core.internalstore.md#getters)*

*Defined in [core/src/store.ts:46](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L46)*

___

### mutations

•  **mutations**: Map\<string, [Mutation](../modules/_harlem_core.md#mutation)\<any>>

*Implementation of [InternalStore](../interfaces/_harlem_core.internalstore.md).[mutations](../interfaces/_harlem_core.internalstore.md#mutations)*

*Defined in [core/src/store.ts:47](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L47)*

___

### name

•  **name**: string

*Implementation of [InternalStore](../interfaces/_harlem_core.internalstore.md).[name](../interfaces/_harlem_core.internalstore.md#name)*

*Defined in [core/src/store.ts:45](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L45)*

## Accessors

### state

• get **state**(): [ReadState](../modules/_harlem_core.md#readstate)\<TState>

*Defined in [core/src/store.ts:58](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L58)*

**Returns:** [ReadState](../modules/_harlem_core.md#readstate)\<TState>

## Methods

### emit

▸ **emit**(`event`: string, `sender`: string, `data`: any): void

*Implementation of [InternalStore](../interfaces/_harlem_core.internalstore.md)*

*Defined in [core/src/store.ts:62](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L62)*

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

*Implementation of [InternalStore](../interfaces/_harlem_core.internalstore.md)*

*Defined in [core/src/store.ts:131](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L131)*

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

*Implementation of [InternalStore](../interfaces/_harlem_core.internalstore.md)*

*Defined in [core/src/store.ts:80](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L80)*

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

*Implementation of [InternalStore](../interfaces/_harlem_core.internalstore.md)*

*Defined in [core/src/store.ts:117](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L117)*

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

▸ **on**(`event`: string, `handler`: [EventHandler](../modules/_harlem_core.md#eventhandler)): [EventListener](../interfaces/_harlem_core.eventlistener.md)

*Defined in [core/src/store.ts:72](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L72)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_harlem_core.md#eventhandler) |

**Returns:** [EventListener](../interfaces/_harlem_core.eventlistener.md)

___

### once

▸ **once**(`event`: string, `handler`: [EventHandler](../modules/_harlem_core.md#eventhandler)): [EventListener](../interfaces/_harlem_core.eventlistener.md)

*Defined in [core/src/store.ts:76](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L76)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_harlem_core.md#eventhandler) |

**Returns:** [EventListener](../interfaces/_harlem_core.eventlistener.md)

___

### write

▸ **write**\<TResult>(`name`: string, `sender`: string, `mutator`: [Mutator](../modules/_harlem_core.md#mutator)\<TState, undefined, TResult>): TResult

*Implementation of [InternalStore](../interfaces/_harlem_core.internalstore.md)*

*Defined in [core/src/store.ts:141](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L141)*

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
