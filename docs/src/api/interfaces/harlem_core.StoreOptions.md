[Harlem - v1.0.0](../index.md) / [@harlem/core](../modules/harlem_core.md) / StoreOptions

# Interface: StoreOptions<TState, TExtensions\>

[@harlem/core](../modules/harlem_core.md).StoreOptions

## Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](../modules/harlem_core.md#basestate) |
| `TExtensions` | extends [`Extension`](../modules/harlem_core.md#extension)<`TState`\>[] |

## Hierarchy

- [`InternalStoreOptions`](harlem_core.InternalStoreOptions.md)<`TState`\>

  ↳ **`StoreOptions`**

## Table of contents

### Properties

- [allowsOverwrite](harlem_core.StoreOptions.md#allowsoverwrite)
- [extensions](harlem_core.StoreOptions.md#extensions)
- [producers](harlem_core.StoreOptions.md#producers)

## Properties

### allowsOverwrite

• **allowsOverwrite**: `boolean`

A boolean indicating whether this store allows overwriting duplicate registrations

#### Inherited from

[InternalStoreOptions](harlem_core.InternalStoreOptions.md).[allowsOverwrite](harlem_core.InternalStoreOptions.md#allowsoverwrite)

#### Defined in

[core/src/types.ts:317](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L317)

___

### extensions

• `Optional` **extensions**: `TExtensions`

An optional array of extensions to extend this store with

#### Defined in

[core/src/types.ts:329](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L329)

___

### producers

• **producers**: `Partial`<[`StoreProducers`](harlem_core.StoreProducers.md)<`TState`\>\>

A set of providers used by this store

#### Inherited from

[InternalStoreOptions](harlem_core.InternalStoreOptions.md).[producers](harlem_core.InternalStoreOptions.md#producers)

#### Defined in

[core/src/types.ts:322](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L322)
