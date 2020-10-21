**[Harlem](../README.md)**

> [Globals](../README.md) / @harlem/plugin-snapshot

# Module: @harlem/plugin-snapshot

## Index

### Interfaces

* [Snapshot](../interfaces/_harlem_plugin_snapshot.snapshot.md)

### Variables

* [SENDER](_harlem_plugin_snapshot.md#sender)
* [eventEmitter](_harlem_plugin_snapshot.md#eventemitter)
* [stores](_harlem_plugin_snapshot.md#stores)

### Functions

* [default](_harlem_plugin_snapshot.md#default)
* [getStore](_harlem_plugin_snapshot.md#getstore)
* [snapshot](_harlem_plugin_snapshot.md#snapshot)

## Variables

### SENDER

• `Const` **SENDER**: \"snapshot\" = "snapshot"

*Defined in [plugins/snapshot/src/constants.ts:1](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/snapshot/src/constants.ts#L1)*

___

### eventEmitter

• `Let` **eventEmitter**: Emittable

*Defined in [plugins/snapshot/src/index.ts:21](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/snapshot/src/index.ts#L21)*

___

### stores

• `Let` **stores**: [InternalStores](_harlem_core.md#internalstores)

*Defined in [plugins/snapshot/src/index.ts:22](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/snapshot/src/index.ts#L22)*

## Functions

### default

▸ **default**(): HarlemPlugin

*Defined in [plugins/snapshot/src/index.ts:55](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/snapshot/src/index.ts#L55)*

**Returns:** HarlemPlugin

___

### getStore

▸ **getStore**(`name`: string): InternalStore

*Defined in [plugins/snapshot/src/index.ts:24](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/snapshot/src/index.ts#L24)*

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |

**Returns:** InternalStore

___

### snapshot

▸ **snapshot**(`name`: string): [Snapshot](../interfaces/_harlem_plugin_snapshot.snapshot.md)

*Defined in [plugins/snapshot/src/index.ts:34](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/snapshot/src/index.ts#L34)*

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |

**Returns:** [Snapshot](../interfaces/_harlem_plugin_snapshot.snapshot.md)
