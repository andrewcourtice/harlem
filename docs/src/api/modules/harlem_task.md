[Harlem - v1.0.0](../index.md) / @harlem/task

# Module: @harlem/task

## Table of contents

### Classes

- [TaskAbortError](../classes/harlem_task.TaskAbortError.md)
- [default](../classes/harlem_task.default.md)

### Type Aliases

- [Product](harlem_task.md#product)
- [TaskAbortCallback](harlem_task.md#taskabortcallback)
- [TaskExecutor](harlem_task.md#taskexecutor)
- [TaskReject](harlem_task.md#taskreject)
- [TaskResolve](harlem_task.md#taskresolve)

## Type Aliases

### Product

Ƭ **Product**<`TResult`\>: (...`args`: `any`[]) => `TResult`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `void` |

#### Type declaration

▸ (...`args`): `TResult`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`TResult`

#### Defined in

[packages/task/src/types.ts:1](https://github.com/andrewcourtice/harlem/blob/ca8d117/packages/task/src/types.ts#L1)

___

### TaskAbortCallback

Ƭ **TaskAbortCallback**: (`reason?`: `unknown`) => `void`

#### Type declaration

▸ (`reason?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `reason?` | `unknown` |

##### Returns

`void`

#### Defined in

[packages/task/src/types.ts:4](https://github.com/andrewcourtice/harlem/blob/ca8d117/packages/task/src/types.ts#L4)

___

### TaskExecutor

Ƭ **TaskExecutor**<`TResult`\>: (`resolve`: [`TaskResolve`](harlem_task.md#taskresolve)<`TResult`\>, `reject`: [`TaskReject`](harlem_task.md#taskreject), `controller`: `AbortController`, `onAbort`: (`callback`: [`TaskAbortCallback`](harlem_task.md#taskabortcallback)) => `void`) => `void`

#### Type parameters

| Name |
| :------ |
| `TResult` |

#### Type declaration

▸ (`resolve`, `reject`, `controller`, `onAbort`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `resolve` | [`TaskResolve`](harlem_task.md#taskresolve)<`TResult`\> |
| `reject` | [`TaskReject`](harlem_task.md#taskreject) |
| `controller` | `AbortController` |
| `onAbort` | (`callback`: [`TaskAbortCallback`](harlem_task.md#taskabortcallback)) => `void` |

##### Returns

`void`

#### Defined in

[packages/task/src/types.ts:6](https://github.com/andrewcourtice/harlem/blob/ca8d117/packages/task/src/types.ts#L6)

___

### TaskReject

Ƭ **TaskReject**: (`reason?`: `unknown`) => `unknown`

#### Type declaration

▸ (`reason?`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `reason?` | `unknown` |

##### Returns

`unknown`

#### Defined in

[packages/task/src/types.ts:3](https://github.com/andrewcourtice/harlem/blob/ca8d117/packages/task/src/types.ts#L3)

___

### TaskResolve

Ƭ **TaskResolve**<`TResult`\>: (`value`: `TResult` \| `PromiseLike`<`TResult`\>) => `void`

#### Type parameters

| Name |
| :------ |
| `TResult` |

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `TResult` \| `PromiseLike`<`TResult`\> |

##### Returns

`void`

#### Defined in

[packages/task/src/types.ts:2](https://github.com/andrewcourtice/harlem/blob/ca8d117/packages/task/src/types.ts#L2)
