[Harlem - v1.0.0](../index.md) / [@harlem/core](../modules/harlem_core.md) / StoreProducers

# Interface: StoreProducers<TState\>

[@harlem/core](../modules/harlem_core.md).StoreProducers

## Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](../modules/harlem_core.md#basestate) |

## Table of contents

### Methods

- [payload](harlem_core.StoreProducers.md#payload)
- [read](harlem_core.StoreProducers.md#read)
- [write](harlem_core.StoreProducers.md#write)

## Methods

### payload

▸ **payload**<`TPayload`\>(`payload`): `TPayload`

The provider used when exposing payloads to mutators

#### Type parameters

| Name |
| :------ |
| `TPayload` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `TPayload` | The payload supplied to the mutation (or requester) |

#### Returns

`TPayload`

#### Defined in

[core/src/types.ts:218](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L218)

___

### read

▸ **read**(`state`): `DeepReadonly`<`TState`\>

The provider used when exposing writable state

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `state` | `DeepReadonly`<`TState`\> | The writable state object |

#### Returns

`DeepReadonly`<`TState`\>

#### Defined in

[core/src/types.ts:204](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L204)

___

### write

▸ **write**(`state`): `TState`

The provider used when exposing writable state

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `state` | `TState` | The writable state object |

#### Returns

`TState`

#### Defined in

[core/src/types.ts:211](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L211)
