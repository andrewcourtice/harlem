[Harlem - v1.0.0](../index.md) / [@harlem/extension-action](../modules/harlem_extension_action.md) / ActionOptions

# Interface: ActionOptions<TPayload\>

[@harlem/extension-action](../modules/harlem_extension_action.md).ActionOptions

## Type parameters

| Name |
| :------ |
| `TPayload` |

## Table of contents

### Properties

- [autoClearErrors](harlem_extension_action.ActionOptions.md#autoclearerrors)
- [concurrent](harlem_extension_action.ActionOptions.md#concurrent)
- [strategies](harlem_extension_action.ActionOptions.md#strategies)
- [suppressAbortErrors](harlem_extension_action.ActionOptions.md#suppressaborterrors)

## Properties

### autoClearErrors

• **autoClearErrors**: `boolean`

#### Defined in

[extensions/action/src/types.ts:38](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/action/src/types.ts#L38)

___

### concurrent

• **concurrent**: `boolean` \| (`payload`: `TPayload`, `runningPayloads`: `TPayload`[]) => `boolean`

#### Defined in

[extensions/action/src/types.ts:37](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/action/src/types.ts#L37)

___

### strategies

• **strategies**: [`ActionStrategies`](harlem_extension_action.ActionStrategies.md)

#### Defined in

[extensions/action/src/types.ts:40](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/action/src/types.ts#L40)

___

### suppressAbortErrors

• **suppressAbortErrors**: `boolean`

#### Defined in

[extensions/action/src/types.ts:39](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/action/src/types.ts#L39)
