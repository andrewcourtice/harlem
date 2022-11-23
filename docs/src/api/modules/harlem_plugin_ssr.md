[Harlem - v1.0.0](../index.md) / @harlem/plugin-ssr

# Module: @harlem/plugin-ssr

## Table of contents

### Functions

- [createClientSSRPlugin](harlem_plugin_ssr.md#createclientssrplugin)
- [createServerSSRPlugin](harlem_plugin_ssr.md#createserverssrplugin)
- [getBridgingScript](harlem_plugin_ssr.md#getbridgingscript)
- [getBridgingScriptBlock](harlem_plugin_ssr.md#getbridgingscriptblock)

## Functions

### createClientSSRPlugin

▸ **createClientSSRPlugin**(): `HarlemPlugin`

Create a new instance of the client-side SSR plugin

#### Returns

`HarlemPlugin`

#### Defined in

[plugins/ssr/src/index.ts:68](https://github.com/andrewcourtice/harlem/blob/ca8d117/plugins/ssr/src/index.ts#L68)

___

### createServerSSRPlugin

▸ **createServerSSRPlugin**(): `HarlemPlugin`

Create a new instance of the server-side SSR plugin

#### Returns

`HarlemPlugin`

#### Defined in

[plugins/ssr/src/index.ts:55](https://github.com/andrewcourtice/harlem/blob/ca8d117/plugins/ssr/src/index.ts#L55)

___

### getBridgingScript

▸ **getBridgingScript**(): `string`

Generate a script required to transfer state from server to client

#### Returns

`string`

#### Defined in

[plugins/ssr/src/index.ts:41](https://github.com/andrewcourtice/harlem/blob/ca8d117/plugins/ssr/src/index.ts#L41)

___

### getBridgingScriptBlock

▸ **getBridgingScriptBlock**(): `string`

Generate a script block required to transfer state from server to client

#### Returns

`string`

#### Defined in

[plugins/ssr/src/index.ts:48](https://github.com/andrewcourtice/harlem/blob/ca8d117/plugins/ssr/src/index.ts#L48)
