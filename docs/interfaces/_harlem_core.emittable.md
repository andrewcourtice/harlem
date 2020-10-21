**[Harlem](../README.md)**

> [Globals](../README.md) / [@harlem/core](../modules/_harlem_core.md) / Emittable

# Interface: Emittable

## Hierarchy

* **Emittable**

## Implemented by

* [EventEmitter](../classes/_harlem_core.eventemitter.md)

## Index

### Methods

* [emit](_harlem_core.emittable.md#emit)
* [off](_harlem_core.emittable.md#off)
* [on](_harlem_core.emittable.md#on)
* [once](_harlem_core.emittable.md#once)

## Methods

### emit

▸ **emit**(`event`: string, `payload?`: [EventPayload](_harlem_core.eventpayload.md)): void

*Defined in [core/src/types.ts:20](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L20)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`payload?` | [EventPayload](_harlem_core.eventpayload.md) |

**Returns:** void

___

### off

▸ **off**(`event`: string, `handler`: [EventHandler](../modules/_harlem_core.md#eventhandler)): void

*Defined in [core/src/types.ts:19](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L19)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_harlem_core.md#eventhandler) |

**Returns:** void

___

### on

▸ **on**(`event`: string, `handler`: [EventHandler](../modules/_harlem_core.md#eventhandler)): [EventListener](_harlem_core.eventlistener.md)

*Defined in [core/src/types.ts:17](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_harlem_core.md#eventhandler) |

**Returns:** [EventListener](_harlem_core.eventlistener.md)

___

### once

▸ **once**(`event`: string, `handler`: [EventHandler](../modules/_harlem_core.md#eventhandler)): [EventListener](_harlem_core.eventlistener.md)

*Defined in [core/src/types.ts:18](https://github.com/andrewcourtice/harlem/blob/97733b5/core/src/types.ts#L18)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_harlem_core.md#eventhandler) |

**Returns:** [EventListener](_harlem_core.eventlistener.md)
