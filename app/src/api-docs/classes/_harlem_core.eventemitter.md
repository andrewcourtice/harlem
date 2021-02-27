**[Harlem](../README.md)**

> [Globals](../README.md) / [@harlem/core](../modules/_harlem_core.md) / EventEmitter

# Class: EventEmitter

## Hierarchy

* **EventEmitter**

## Implements

* [Emittable](../interfaces/_harlem_core.emittable.md)

## Index

### Constructors

* [constructor](_harlem_core.eventemitter.md#constructor)

### Methods

* [emit](_harlem_core.eventemitter.md#emit)
* [off](_harlem_core.eventemitter.md#off)
* [on](_harlem_core.eventemitter.md#on)
* [once](_harlem_core.eventemitter.md#once)

## Constructors

### constructor

\+ **new EventEmitter**(): [EventEmitter](_harlem_core.eventemitter.md)

*Defined in [core/src/event-emitter.ts:10](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/event-emitter.ts#L10)*

**Returns:** [EventEmitter](_harlem_core.eventemitter.md)

## Methods

### emit

▸ **emit**(`event`: string, `payload?`: [EventPayload](../interfaces/_harlem_core.eventpayload.md)): void

*Implementation of [Emittable](../interfaces/_harlem_core.emittable.md)*

*Defined in [core/src/event-emitter.ts:51](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/event-emitter.ts#L51)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`payload?` | [EventPayload](../interfaces/_harlem_core.eventpayload.md) |

**Returns:** void

___

### off

▸ **off**(`event`: string, `handler`: [EventHandler](../modules/_harlem_core.md#eventhandler)): void

*Implementation of [Emittable](../interfaces/_harlem_core.emittable.md)*

*Defined in [core/src/event-emitter.ts:28](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/event-emitter.ts#L28)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_harlem_core.md#eventhandler) |

**Returns:** void

___

### on

▸ **on**(`event`: string, `handler`: [EventHandler](../modules/_harlem_core.md#eventhandler)): [EventListener](../interfaces/_harlem_core.eventlistener.md)

*Implementation of [Emittable](../interfaces/_harlem_core.emittable.md)*

*Defined in [core/src/event-emitter.ts:16](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/event-emitter.ts#L16)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_harlem_core.md#eventhandler) |

**Returns:** [EventListener](../interfaces/_harlem_core.eventlistener.md)

___

### once

▸ **once**(`event`: string, `handler`: [EventHandler](../modules/_harlem_core.md#eventhandler)): [EventListener](../interfaces/_harlem_core.eventlistener.md)

*Implementation of [Emittable](../interfaces/_harlem_core.emittable.md)*

*Defined in [core/src/event-emitter.ts:42](https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/event-emitter.ts#L42)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_harlem_core.md#eventhandler) |

**Returns:** [EventListener](../interfaces/_harlem_core.eventlistener.md)
