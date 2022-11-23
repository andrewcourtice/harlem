[Harlem - v1.0.0](../index.md) / [@harlem/extension-action](../modules/harlem_extension_action.md) / ActionState

# Interface: ActionState<TPayload, TResult\>

[@harlem/extension-action](../modules/harlem_extension_action.md).ActionState

## Type parameters

| Name | Type |
| :------ | :------ |
| `TPayload` | `unknown` |
| `TResult` | `unknown` |

## Table of contents

### Properties

- [errors](harlem_extension_action.ActionState.md#errors)
- [instances](harlem_extension_action.ActionState.md#instances)
- [runCount](harlem_extension_action.ActionState.md#runcount)
- [tasks](harlem_extension_action.ActionState.md#tasks)

## Properties

### errors

• **errors**: `Map`<`symbol`, `unknown`\>

#### Defined in

[extensions/action/src/types.ts:33](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/action/src/types.ts#L33)

___

### instances

• **instances**: `Map`<`symbol`, `TPayload`\>

#### Defined in

[extensions/action/src/types.ts:32](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/action/src/types.ts#L32)

___

### runCount

• **runCount**: `number`

#### Defined in

[extensions/action/src/types.ts:30](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/action/src/types.ts#L30)

___

### tasks

• **tasks**: `Set`<`Task`<`TResult`\>\>

#### Defined in

[extensions/action/src/types.ts:31](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/action/src/types.ts#L31)
