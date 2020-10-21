**[Harlem](../README.md)**

> [Globals](../README.md) / @harlem/plugin-devtools

# Module: @harlem/plugin-devtools

## Index

### Interfaces

* [Options](../interfaces/_harlem_plugin_devtools.options.md)

### Type aliases

* [StateHookHandler](_harlem_plugin_devtools.md#statehookhandler)
* [TreeHookHandler](_harlem_plugin_devtools.md#treehookhandler)

### Variables

* [ALL\_STORES\_ID](_harlem_plugin_devtools.md#all_stores_id)
* [DEVTOOLS\_ID](_harlem_plugin_devtools.md#devtools_id)
* [SENDER](_harlem_plugin_devtools.md#sender)

### Functions

* [createDevtoolsPlugin](_harlem_plugin_devtools.md#createdevtoolsplugin)
* [getInspectorStateHook](_harlem_plugin_devtools.md#getinspectorstatehook)
* [getInspectorTreeHook](_harlem_plugin_devtools.md#getinspectortreehook)
* [getMutationHook](_harlem_plugin_devtools.md#getmutationhook)
* [getStoreSnapshot](_harlem_plugin_devtools.md#getstoresnapshot)
* [getStoreSnapshots](_harlem_plugin_devtools.md#getstoresnapshots)
* [stringComparitor](_harlem_plugin_devtools.md#stringcomparitor)

### Object literals

* [OPTIONS](_harlem_plugin_devtools.md#options)

## Type aliases

### StateHookHandler

Ƭ  **StateHookHandler**: HookHandler\<HookPayloads[GET\_INSPECTOR\_STATE], any>

*Defined in [plugins/devtools/src/types.ts:8](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/devtools/src/types.ts#L8)*

___

### TreeHookHandler

Ƭ  **TreeHookHandler**: HookHandler\<HookPayloads[GET\_INSPECTOR\_TREE], any>

*Defined in [plugins/devtools/src/types.ts:7](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/devtools/src/types.ts#L7)*

## Variables

### ALL\_STORES\_ID

• `Const` **ALL\_STORES\_ID**: \"$all\" = "$all"

*Defined in [plugins/devtools/src/constants.ts:7](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/devtools/src/constants.ts#L7)*

___

### DEVTOOLS\_ID

• `Const` **DEVTOOLS\_ID**: \"harlem\" = "harlem"

*Defined in [plugins/devtools/src/constants.ts:6](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/devtools/src/constants.ts#L6)*

___

### SENDER

• `Const` **SENDER**: \"devtools\" = "devtools"

*Defined in [plugins/devtools/src/constants.ts:5](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/devtools/src/constants.ts#L5)*

## Functions

### createDevtoolsPlugin

▸ **createDevtoolsPlugin**(`options?`: Partial\<[Options](../interfaces/_harlem_plugin_devtools.options.md)>): HarlemPlugin

*Defined in [plugins/devtools/src/index.ts:158](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/devtools/src/index.ts#L158)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`options` | Partial\<[Options](../interfaces/_harlem_plugin_devtools.options.md)> | OPTIONS |

**Returns:** HarlemPlugin

___

### getInspectorStateHook

▸ **getInspectorStateHook**(`application`: App, `stores`: [InternalStores](_harlem_core.md#internalstores)): [StateHookHandler](_harlem_plugin_devtools.md#statehookhandler)

*Defined in [plugins/devtools/src/index.ts:116](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/devtools/src/index.ts#L116)*

#### Parameters:

Name | Type |
------ | ------ |
`application` | App |
`stores` | [InternalStores](_harlem_core.md#internalstores) |

**Returns:** [StateHookHandler](_harlem_plugin_devtools.md#statehookhandler)

___

### getInspectorTreeHook

▸ **getInspectorTreeHook**(`application`: App, `stores`: [InternalStores](_harlem_core.md#internalstores)): [TreeHookHandler](_harlem_plugin_devtools.md#treehookhandler)

*Defined in [plugins/devtools/src/index.ts:35](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/devtools/src/index.ts#L35)*

#### Parameters:

Name | Type |
------ | ------ |
`application` | App |
`stores` | [InternalStores](_harlem_core.md#internalstores) |

**Returns:** [TreeHookHandler](_harlem_plugin_devtools.md#treehookhandler)

___

### getMutationHook

▸ **getMutationHook**(`api`: DevtoolsPluginApi): [EventHandler](_harlem_core.md#eventhandler)

*Defined in [plugins/devtools/src/index.ts:138](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/devtools/src/index.ts#L138)*

#### Parameters:

Name | Type |
------ | ------ |
`api` | DevtoolsPluginApi |

**Returns:** [EventHandler](_harlem_core.md#eventhandler)

___

### getStoreSnapshot

▸ **getStoreSnapshot**(`store`: InternalStore): CustomInspectorState

*Defined in [plugins/devtools/src/index.ts:63](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/devtools/src/index.ts#L63)*

#### Parameters:

Name | Type |
------ | ------ |
`store` | InternalStore |

**Returns:** CustomInspectorState

___

### getStoreSnapshots

▸ **getStoreSnapshots**(`stores`: (InternalStore \| undefined)[]): CustomInspectorState

*Defined in [plugins/devtools/src/index.ts:96](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/devtools/src/index.ts#L96)*

#### Parameters:

Name | Type |
------ | ------ |
`stores` | (InternalStore \| undefined)[] |

**Returns:** CustomInspectorState

___

### stringComparitor

▸ **stringComparitor**(`valueA`: string, `valueB`: string): number

*Defined in [plugins/devtools/src/index.ts:31](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/devtools/src/index.ts#L31)*

#### Parameters:

Name | Type |
------ | ------ |
`valueA` | string |
`valueB` | string |

**Returns:** number

## Object literals

### OPTIONS

▪ `Const` **OPTIONS**: object

*Defined in [plugins/devtools/src/constants.ts:9](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/devtools/src/constants.ts#L9)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`color` | number | 4244621 |
`label` | string | "Harlem" |
