**[Harlem](../README.md)**

> [Globals](../README.md) / @harlem/plugin-ssr

# Module: @harlem/plugin-ssr

## Index

### Variables

* [SENDER](_harlem_plugin_ssr.md#sender)

### Functions

* [createClientSSRPlugin](_harlem_plugin_ssr.md#createclientssrplugin)
* [createServerSSRPlugin](_harlem_plugin_ssr.md#createserverssrplugin)
* [getBridgingScript](_harlem_plugin_ssr.md#getbridgingscript)
* [getBridgingScriptBlock](_harlem_plugin_ssr.md#getbridgingscriptblock)

## Variables

### SENDER

• `Const` **SENDER**: \"ssr\" = "ssr"

*Defined in [plugins/ssr/src/constants.ts:1](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/ssr/src/constants.ts#L1)*

## Functions

### createClientSSRPlugin

▸ **createClientSSRPlugin**(): HarlemPlugin

*Defined in [plugins/ssr/src/index.ts:70](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/ssr/src/index.ts#L70)*

Create a new instance of the client-side SSR plugin

**Returns:** HarlemPlugin

___

### createServerSSRPlugin

▸ **createServerSSRPlugin**(): HarlemPlugin

*Defined in [plugins/ssr/src/index.ts:53](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/ssr/src/index.ts#L53)*

Create a new instance of the server-side SSR plugin

**Returns:** HarlemPlugin

___

### getBridgingScript

▸ **getBridgingScript**(): string

*Defined in [plugins/ssr/src/index.ts:39](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/ssr/src/index.ts#L39)*

Generate a script required to transfer state from server to client

**Returns:** string

___

### getBridgingScriptBlock

▸ **getBridgingScriptBlock**(): string

*Defined in [plugins/ssr/src/index.ts:46](https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/ssr/src/index.ts#L46)*

Generate a script block required to transfer state from server to client

**Returns:** string
