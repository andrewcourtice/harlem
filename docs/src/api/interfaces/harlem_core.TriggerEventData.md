[Harlem - v1.0.0](../index.md) / [@harlem/core](../modules/harlem_core.md) / TriggerEventData

# Interface: TriggerEventData<TPayload, TResult\>

[@harlem/core](../modules/harlem_core.md).TriggerEventData

## Type parameters

| Name | Type |
| :------ | :------ |
| `TPayload` | `any` |
| `TResult` | `any` |

## Table of contents

### Properties

- [name](harlem_core.TriggerEventData.md#name)
- [payload](harlem_core.TriggerEventData.md#payload)
- [result](harlem_core.TriggerEventData.md#result)

## Properties

### name

• **name**: `string`

The name of the mutation/action that fired this trigger.

#### Defined in

[core/src/types.ts:105](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L105)

___

### payload

• **payload**: `TPayload`

The payload provided to the mutation/action that fired this trigger.

#### Defined in

[core/src/types.ts:110](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L110)

___

### result

• `Optional` **result**: `TResult`

The result returned from the mutation/action that fired this trigger. This is only populated for after and success triggers.

#### Defined in

[core/src/types.ts:115](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L115)
