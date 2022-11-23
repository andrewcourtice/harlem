[Harlem - v1.0.0](../index.md) / [@harlem/extension-storage](../modules/harlem_extension_storage.md) / Options

# Interface: Options<TState\>

[@harlem/extension-storage](../modules/harlem_extension_storage.md).Options

## Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends `BaseState` |

## Hierarchy

- `Matchable`

  ↳ **`Options`**

## Table of contents

### Properties

- [branch](harlem_extension_storage.Options.md#branch)
- [exclude](harlem_extension_storage.Options.md#exclude)
- [include](harlem_extension_storage.Options.md#include)
- [prefix](harlem_extension_storage.Options.md#prefix)
- [restore](harlem_extension_storage.Options.md#restore)
- [sync](harlem_extension_storage.Options.md#sync)
- [type](harlem_extension_storage.Options.md#type)

### Methods

- [parser](harlem_extension_storage.Options.md#parser)
- [serialiser](harlem_extension_storage.Options.md#serialiser)

## Properties

### branch

• **branch**: `BranchAccessor`<`TState`, `unknown`\>

#### Defined in

[extensions/storage/src/types.ts:20](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/storage/src/types.ts#L20)

___

### exclude

• **exclude**: `Matcher`

#### Inherited from

Matchable.exclude

#### Defined in

packages/utilities/dist/index.d.ts:17

___

### include

• **include**: `Matcher`

#### Inherited from

Matchable.include

#### Defined in

packages/utilities/dist/index.d.ts:16

___

### prefix

• **prefix**: `string`

#### Defined in

[extensions/storage/src/types.ts:15](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/storage/src/types.ts#L15)

___

### restore

• **restore**: `boolean`

#### Defined in

[extensions/storage/src/types.ts:17](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/storage/src/types.ts#L17)

___

### sync

• **sync**: `boolean`

#### Defined in

[extensions/storage/src/types.ts:16](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/storage/src/types.ts#L16)

___

### type

• **type**: [`StorageType`](../modules/harlem_extension_storage.md#storagetype)

#### Defined in

[extensions/storage/src/types.ts:14](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/storage/src/types.ts#L14)

## Methods

### parser

▸ **parser**(`value`): `TState`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`TState`

#### Defined in

[extensions/storage/src/types.ts:19](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/storage/src/types.ts#L19)

___

### serialiser

▸ **serialiser**(`state`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `DeepReadonly`<`TState`\> |

#### Returns

`string`

#### Defined in

[extensions/storage/src/types.ts:18](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/storage/src/types.ts#L18)
