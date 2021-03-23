**[Harlem](../README.md)**

> [Globals](../README.md) / @harlem/plugin-devtools

# Module: @harlem/plugin-devtools

## Index

### Interfaces

* [Options](../interfaces/_harlem_plugin_devtools.options.md)

### Type aliases

* [EditHookHandler](_harlem_plugin_devtools.md#edithookhandler)
* [LogType](_harlem_plugin_devtools.md#logtype)
* [StateHookHandler](_harlem_plugin_devtools.md#statehookhandler)
* [TreeHookHandler](_harlem_plugin_devtools.md#treehookhandler)

### Variables

* [ALL\_STORES\_ID](_harlem_plugin_devtools.md#all_stores_id)
* [DEVTOOLS\_ID](_harlem_plugin_devtools.md#devtools_id)
* [SENDER](_harlem_plugin_devtools.md#sender)

### Functions

* [createDevtoolsPlugin](_harlem_plugin_devtools.md#createdevtoolsplugin)

### Object literals

* [OPTIONS](_harlem_plugin_devtools.md#options)

## Type aliases

### EditHookHandler

Ƭ  **EditHookHandler**: HookHandler\<HookPayloads[EDIT\_INSPECTOR\_STATE], any>

*Defined in [plugins/devtools/src/types.ts:9](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/types.ts#L9)*

___

### LogType

Ƭ  **LogType**: \"default\" \| \"warning\" \| \"error\"

*Defined in [plugins/devtools/src/types.ts:11](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/types.ts#L11)*

___

### StateHookHandler

Ƭ  **StateHookHandler**: HookHandler\<HookPayloads[GET\_INSPECTOR\_STATE], any>

*Defined in [plugins/devtools/src/types.ts:8](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/types.ts#L8)*

___

### TreeHookHandler

Ƭ  **TreeHookHandler**: HookHandler\<HookPayloads[GET\_INSPECTOR\_TREE], any>

*Defined in [plugins/devtools/src/types.ts:7](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/types.ts#L7)*

## Variables

### ALL\_STORES\_ID

• `Const` **ALL\_STORES\_ID**: \"$all\" = "$all"

*Defined in [plugins/devtools/src/constants.ts:7](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/constants.ts#L7)*

___

### DEVTOOLS\_ID

• `Const` **DEVTOOLS\_ID**: \"harlem\" = "harlem"

*Defined in [plugins/devtools/src/constants.ts:6](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/constants.ts#L6)*

___

### SENDER

• `Const` **SENDER**: \"devtools\" = "devtools"

*Defined in [plugins/devtools/src/constants.ts:5](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/constants.ts#L5)*

## Functions

### createDevtoolsPlugin

▸ **createDevtoolsPlugin**(`options?`: Partial\<[Options](../interfaces/_harlem_plugin_devtools.options.md)>): HarlemPlugin

*Defined in [plugins/devtools/src/index.ts:200](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/index.ts#L200)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`options` | Partial\<[Options](../interfaces/_harlem_plugin_devtools.options.md)> | OPTIONS |

**Returns:** HarlemPlugin

## Object literals

### OPTIONS

▪ `Const` **OPTIONS**: object

*Defined in [plugins/devtools/src/constants.ts:9](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/constants.ts#L9)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`color` | number | 4244621 |
`label` | string | "Harlem" |
