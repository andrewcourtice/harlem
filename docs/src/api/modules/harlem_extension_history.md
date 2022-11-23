[Harlem - v1.0.0](../index.md) / @harlem/extension-history

# Module: @harlem/extension-history

## Table of contents

### Interfaces

- [HistoryCommand](../interfaces/harlem_extension_history.HistoryCommand.md)
- [HistoryMutation](../interfaces/harlem_extension_history.HistoryMutation.md)
- [MutationPayload](../interfaces/harlem_extension_history.MutationPayload.md)
- [Options](../interfaces/harlem_extension_history.Options.md)

### Type Aliases

- [CommandTask](harlem_extension_history.md#commandtask)
- [CommandTasks](harlem_extension_history.md#commandtasks)
- [CommandType](harlem_extension_history.md#commandtype)

### Functions

- [default](harlem_extension_history.md#default)

## Type Aliases

### CommandTask

Ƭ **CommandTask**: (`target`: `any`, `prop`: `PropertyKey`, `newValue`: `unknown`, `oldValue`: `unknown`) => `void`

#### Type declaration

▸ (`target`, `prop`, `newValue`, `oldValue`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `prop` | `PropertyKey` |
| `newValue` | `unknown` |
| `oldValue` | `unknown` |

##### Returns

`void`

#### Defined in

[extensions/history/src/types.ts:7](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/history/src/types.ts#L7)

___

### CommandTasks

Ƭ **CommandTasks**: `Record`<`TraceGate`<`any`\>, [`CommandTask`](harlem_extension_history.md#commandtask)\>

#### Defined in

[extensions/history/src/types.ts:8](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/history/src/types.ts#L8)

___

### CommandType

Ƭ **CommandType**: ``"exec"`` \| ``"undo"``

#### Defined in

[extensions/history/src/types.ts:6](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/history/src/types.ts#L6)

## Functions

### default

▸ **default**<`TState`\>(`options?`): (`store`: `InternalStore`<`TState`\>) => { `clearHistory`: () => `void` ; `redo`: () => `void` ; `undo`: () => `void`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends `BaseState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<[`Options`](../interfaces/harlem_extension_history.Options.md)\> |

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
| `clearHistory` | () => `void` |
| `redo` | () => `void` |
| `undo` | () => `void` |

#### Defined in

[extensions/history/src/index.ts:39](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/history/src/index.ts#L39)
