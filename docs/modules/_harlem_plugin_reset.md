**[Harlem](../README.md)**

> [Globals](../README.md) / @harlem/plugin-reset

# Module: @harlem/plugin-reset

## Index

### Variables

* [SENDER](_harlem_plugin_reset.md#sender)
* [eventEmitter](_harlem_plugin_reset.md#eventemitter)
* [snapshots](_harlem_plugin_reset.md#snapshots)
* [stores](_harlem_plugin_reset.md#stores)

### Functions

* [default](_harlem_plugin_reset.md#default)
* [reset](_harlem_plugin_reset.md#reset)

## Variables

### SENDER

• `Const` **SENDER**: \"reset\" = "reset"

*Defined in [plugins/reset/src/constants.ts:1](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/reset/src/constants.ts#L1)*

___

### eventEmitter

• `Let` **eventEmitter**: Emittable

*Defined in [plugins/reset/src/index.ts:18](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/reset/src/index.ts#L18)*

___

### snapshots

• `Const` **snapshots**: Map\<string, any> = new Map\<string, any>()

*Defined in [plugins/reset/src/index.ts:16](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/reset/src/index.ts#L16)*

___

### stores

• `Let` **stores**: [InternalStores](_harlem_core.md#internalstores)

*Defined in [plugins/reset/src/index.ts:19](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/reset/src/index.ts#L19)*

## Functions

### default

▸ **default**(): HarlemPlugin

*Defined in [plugins/reset/src/index.ts:34](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/reset/src/index.ts#L34)*

**Returns:** HarlemPlugin

___

### reset

▸ **reset**(`name`: string): void

*Defined in [plugins/reset/src/index.ts:21](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/reset/src/index.ts#L21)*

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |

**Returns:** void
