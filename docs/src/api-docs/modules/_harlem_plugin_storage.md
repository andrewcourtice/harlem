**[Harlem](../README.md)**

> [Globals](../README.md) / @harlem/plugin-storage

# Module: @harlem/plugin-storage

## Index

### References

* [Options](_harlem_plugin_storage.md#options)
* [StorageMap](_harlem_plugin_storage.md#storagemap)
* [StorageType](_harlem_plugin_storage.md#storagetype)

### Interfaces

* [Options](../interfaces/_harlem_plugin_storage.options.md)

### Type aliases

* [StorageMap](_harlem_plugin_storage.md#storagemap)
* [StorageType](_harlem_plugin_storage.md#storagetype)

### Variables

* [SENDER](_harlem_plugin_storage.md#sender)

### Functions

* [createStoragePlugin](_harlem_plugin_storage.md#createstorageplugin)

### Object literals

* [OPTIONS](_harlem_plugin_storage.md#options)
* [STORAGE](_harlem_plugin_storage.md#storage)

## References

### Options

Re-exports: [Options](../interfaces/_harlem_plugin_storage.options.md)

___

### StorageMap

Re-exports: [StorageMap](_harlem_plugin_storage.md#storagemap)

___

### StorageType

Re-exports: [StorageType](_harlem_plugin_storage.md#storagetype)

## Type aliases

### StorageMap

Ƭ  **StorageMap**: Record\<[StorageType](_harlem_plugin_storage.md#storagetype), Storage>

*Defined in [plugins/storage/src/types.ts:2](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/storage/src/types.ts#L2)*

___

### StorageType

Ƭ  **StorageType**: \"local\" \| \"session\"

*Defined in [plugins/storage/src/types.ts:1](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/storage/src/types.ts#L1)*

## Variables

### SENDER

• `Const` **SENDER**: \"storage\" = "storage"

*Defined in [plugins/storage/src/constants.ts:6](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/storage/src/constants.ts#L6)*

## Functions

### createStoragePlugin

▸ **createStoragePlugin**(`stores`: string \| string[], `options?`: Partial\<[Options](../interfaces/_harlem_plugin_storage.options.md)>): HarlemPlugin

*Defined in [plugins/storage/src/index.ts:19](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/storage/src/index.ts#L19)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`stores` | string \| string[] | - |
`options` | Partial\<[Options](../interfaces/_harlem_plugin_storage.options.md)> | OPTIONS |

**Returns:** HarlemPlugin

## Object literals

### OPTIONS

▪ `Const` **OPTIONS**: object

*Defined in [plugins/storage/src/constants.ts:8](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/storage/src/constants.ts#L8)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`prefix` | string | "harlem" |
`sync` | true | true |
`type` | \"local\" | "local" |

___

### STORAGE

▪ `Const` **STORAGE**: object

*Defined in [plugins/storage/src/constants.ts:14](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/storage/src/constants.ts#L14)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`local` | Storage | localStorage |
`session` | Storage | sessionStorage |
