[Harlem - v1.0.0](../index.md) / @harlem/extension-storage

# Module: @harlem/extension-storage

## Table of contents

### Interfaces

- [Options](../interfaces/harlem_extension_storage.Options.md)

### Type Aliases

- [StorageType](harlem_extension_storage.md#storagetype)

### Functions

- [default](harlem_extension_storage.md#default)

## Type Aliases

### StorageType

Ƭ **StorageType**: ``"local"`` \| ``"session"``

#### Defined in

[extensions/storage/src/types.ts:11](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/storage/src/types.ts#L11)

## Functions

### default

▸ **default**<`TState`\>(`options?`): (`store`: `InternalStore`<`TState`\>) => { `clearStorage`: () => `void` = noop; `restoreStorage`: () => `void` = noop; `startStorageSync`: () => `void` = noop; `stopStorageSync`: () => `void` = noop }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends `BaseState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<[`Options`](../interfaces/harlem_extension_storage.Options.md)<`TState`\>\> |

#### Returns

`fn`

▸ (`store`): `Object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `InternalStore`<`TState`\> |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `clearStorage` | () => `void` |
| `restoreStorage` | () => `void` |
| `startStorageSync` | () => `void` |
| `stopStorageSync` | () => `void` |

#### Defined in

[extensions/storage/src/index.ts:45](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/storage/src/index.ts#L45)
