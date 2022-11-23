[Harlem - v1.0.0](../index.md) / [@harlem/task](../modules/harlem_task.md) / default

# Class: default<TResult\>

[@harlem/task](../modules/harlem_task.md).default

## Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `void` |

## Hierarchy

- `Promise`<`TResult`\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](harlem_task.default.md#constructor)

### Accessors

- [hasAborted](harlem_task.default.md#hasaborted)
- [signal](harlem_task.default.md#signal)

### Methods

- [abort](harlem_task.default.md#abort)
- [isTask](harlem_task.default.md#istask)

## Constructors

### constructor

• **new default**<`TResult`\>(`executor`, `controller?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `executor` | [`TaskExecutor`](../modules/harlem_task.md#taskexecutor)<`TResult`\> |
| `controller` | `AbortController` |

#### Overrides

Promise&lt;TResult\&gt;.constructor

#### Defined in

[packages/task/src/index.ts:19](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/task/src/index.ts#L19)

## Accessors

### hasAborted

• `get` **hasAborted**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/task/src/index.ts:79](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/task/src/index.ts#L79)

___

### signal

• `get` **signal**(): `AbortSignal`

#### Returns

`AbortSignal`

#### Defined in

[packages/task/src/index.ts:75](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/task/src/index.ts#L75)

## Methods

### abort

▸ **abort**(`reason?`): [`default`](harlem_task.default.md)<`TResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `reason?` | `unknown` |

#### Returns

[`default`](harlem_task.default.md)<`TResult`\>

#### Defined in

[packages/task/src/index.ts:83](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/task/src/index.ts#L83)

___

### isTask

▸ `Static` **isTask**(`value`): value is default<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is default<void\>

#### Defined in

[packages/task/src/index.ts:71](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/task/src/index.ts#L71)
