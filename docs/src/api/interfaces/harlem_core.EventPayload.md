[Harlem - v1.0.0](../index.md) / [@harlem/core](../modules/harlem_core.md) / EventPayload

# Interface: EventPayload<TData\>

[@harlem/core](../modules/harlem_core.md).EventPayload

## Type parameters

| Name | Type |
| :------ | :------ |
| `TData` | `any` |

## Table of contents

### Properties

- [data](harlem_core.EventPayload.md#data)
- [sender](harlem_core.EventPayload.md#sender)
- [store](harlem_core.EventPayload.md#store)

## Properties

### data

• **data**: `TData`

A payload sent along with the event.

#### Defined in

[core/src/types.ts:98](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L98)

___

### sender

• **sender**: `string`

The name of the event sender. This could be the core library, any registered extension/plugin, or user-emitted events.

#### Defined in

[core/src/types.ts:88](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L88)

___

### store

• **store**: `string`

The store on which this event took place.

#### Defined in

[core/src/types.ts:93](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L93)
