[Harlem - v1.0.0](../index.md) / [@harlem/core](../modules/harlem_core.md) / InternalStoreOptions

# Interface: InternalStoreOptions<TState\>

[@harlem/core](../modules/harlem_core.md).InternalStoreOptions

## Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](../modules/harlem_core.md#basestate) |

## Hierarchy

- **`InternalStoreOptions`**

  ↳ [`StoreOptions`](harlem_core.StoreOptions.md)

## Table of contents

### Properties

- [allowsOverwrite](harlem_core.InternalStoreOptions.md#allowsoverwrite)
- [producers](harlem_core.InternalStoreOptions.md#producers)

## Properties

### allowsOverwrite

• **allowsOverwrite**: `boolean`

A boolean indicating whether this store allows overwriting duplicate registrations

#### Defined in

[core/src/types.ts:317](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L317)

___

### producers

• **producers**: `Partial`<[`StoreProducers`](harlem_core.StoreProducers.md)<`TState`\>\>

A set of providers used by this store

#### Defined in

[core/src/types.ts:322](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L322)
