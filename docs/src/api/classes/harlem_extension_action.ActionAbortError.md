[Harlem - v1.0.0](../index.md) / [@harlem/extension-action](../modules/harlem_extension_action.md) / ActionAbortError

# Class: ActionAbortError

[@harlem/extension-action](../modules/harlem_extension_action.md).ActionAbortError

## Hierarchy

- `Error`

  ↳ **`ActionAbortError`**

## Table of contents

### Constructors

- [constructor](harlem_extension_action.ActionAbortError.md#constructor)

### Properties

- [instanceId](harlem_extension_action.ActionAbortError.md#instanceid)
- [name](harlem_extension_action.ActionAbortError.md#name)
- [reason](harlem_extension_action.ActionAbortError.md#reason)

## Constructors

### constructor

• **new ActionAbortError**(`name`, `instanceId`, `reason?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `instanceId` | `symbol` |
| `reason?` | `unknown` |

#### Overrides

Error.constructor

#### Defined in

[extensions/action/src/errors.ts:10](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/action/src/errors.ts#L10)

## Properties

### instanceId

• **instanceId**: `symbol`

#### Defined in

[extensions/action/src/errors.ts:7](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/action/src/errors.ts#L7)

___

### name

• **name**: `string`

#### Overrides

Error.name

#### Defined in

[extensions/action/src/errors.ts:6](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/action/src/errors.ts#L6)

___

### reason

• `Optional` **reason**: `unknown`

#### Defined in

[extensions/action/src/errors.ts:8](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/action/src/errors.ts#L8)
