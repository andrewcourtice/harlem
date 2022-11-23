[Harlem - v1.0.0](../index.md) / [@harlem/core](../modules/harlem_core.md) / EventBus

# Interface: EventBus

[@harlem/core](../modules/harlem_core.md).EventBus

## Table of contents

### Methods

- [emit](harlem_core.EventBus.md#emit)
- [off](harlem_core.EventBus.md#off)
- [on](harlem_core.EventBus.md#on)
- [once](harlem_core.EventBus.md#once)

## Methods

### emit

▸ **emit**(`event`, `payload?`): `void`

Publish an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | The name of the event to publish |
| `payload?` | [`EventPayload`](harlem_core.EventPayload.md)<`any`\> | An optional payload to publish with the event |

#### Returns

`void`

#### Defined in

[core/src/types.ts:81](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L81)

___

### off

▸ **off**(`event`, `handler`): `void`

Unsubscribe from an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | The name of the event to unsubscribe from |
| `handler` | [`EventHandler`](../modules/harlem_core.md#eventhandler)<`any`\> | The handler the was registered to the event |

#### Returns

`void`

#### Defined in

[core/src/types.ts:73](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L73)

___

### on

▸ **on**(`event`, `handler`): `Disposable`

Subscribe to an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | The name of the event to subscribe to |
| `handler` | [`EventHandler`](../modules/harlem_core.md#eventhandler)<`any`\> | A handler called when the event is fired |

#### Returns

`Disposable`

#### Defined in

[core/src/types.ts:57](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L57)

___

### once

▸ **once**(`event`, `handler`): `Disposable`

Subscribe to an event. Once the event is fired once, this listener is automatically detached.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | The name of the event to subscribe to |
| `handler` | [`EventHandler`](../modules/harlem_core.md#eventhandler)<`any`\> | A handler called when the event is fired |

#### Returns

`Disposable`

#### Defined in

[core/src/types.ts:65](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L65)
