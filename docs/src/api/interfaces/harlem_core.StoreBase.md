[Harlem - v1.0.0](../index.md) / [@harlem/core](../modules/harlem_core.md) / StoreBase

# Interface: StoreBase<TState\>

[@harlem/core](../modules/harlem_core.md).StoreBase

## Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](../modules/harlem_core.md#basestate) |

## Hierarchy

- **`StoreBase`**

  ↳ [`InternalStore`](harlem_core.InternalStore.md)

  ↳ [`Store`](harlem_core.Store.md)

## Table of contents

### Methods

- [action](harlem_core.StoreBase.md#action)
- [destroy](harlem_core.StoreBase.md#destroy)
- [getter](harlem_core.StoreBase.md#getter)
- [mutation](harlem_core.StoreBase.md#mutation)
- [on](harlem_core.StoreBase.md#on)
- [once](harlem_core.StoreBase.md#once)
- [reset](harlem_core.StoreBase.md#reset)
- [snapshot](harlem_core.StoreBase.md#snapshot)
- [suppress](harlem_core.StoreBase.md#suppress)

## Methods

### action

▸ **action**<`TPayload`, `TResult`\>(`name`, `body`): [`Action`](../modules/harlem_core.md#action)<`TPayload`, `TResult`\>

Register an action on this store

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TPayload` | `TPayload` |
| `TResult` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of this action |
| `body` | [`ActionBody`](../modules/harlem_core.md#actionbody)<`TState`, `TPayload`, `TResult`\> | The function to execute as part of this action. This function receives a payload and mutator function as it's parameters. |

#### Returns

[`Action`](../modules/harlem_core.md#action)<`TPayload`, `TResult`\>

#### Defined in

[core/src/types.ts:155](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L155)

___

### destroy

▸ **destroy**(): `void`

Destroy this store

#### Returns

`void`

#### Defined in

[core/src/types.ts:195](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L195)

___

### getter

▸ **getter**<`TResult`\>(`name`, `getter`): `ComputedRef`<`TResult`\>

Register a getter on this store

#### Type parameters

| Name |
| :------ |
| `TResult` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of this getter |
| `getter` | [`Getter`](../modules/harlem_core.md#getter)<`TState`, `TResult`\> | A function returning the computed value from state |

#### Returns

`ComputedRef`<`TResult`\>

#### Defined in

[core/src/types.ts:139](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L139)

___

### mutation

▸ **mutation**<`TPayload`, `TResult`\>(`name`, `mutator`): [`Mutation`](../modules/harlem_core.md#mutation)<`TPayload`, `TResult`\>

Register a mutation on this store

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TPayload` | `TPayload` |
| `TResult` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of this mutation |
| `mutator` | [`Mutator`](../modules/harlem_core.md#mutator)<`TState`, `TPayload`, `TResult`\> | A function used to mutate state. This function receives state and a payload as it's parameters. |

#### Returns

[`Mutation`](../modules/harlem_core.md#mutation)<`TPayload`, `TResult`\>

#### Defined in

[core/src/types.ts:147](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L147)

___

### on

▸ **on**(`event`, `handler`): `Disposable`

Listen to an event on this store. This is useful for creating triggers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | The name of the event to listen to |
| `handler` | [`EventHandler`](../modules/harlem_core.md#eventhandler)<`any`\> | The handler that will be called when the event is triggered |

#### Returns

`Disposable`

#### Defined in

[core/src/types.ts:163](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L163)

___

### once

▸ **once**(`event`, `handler`): `Disposable`

Listen to an event on this store (only executed once)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | The name of the event to listen to |
| `handler` | [`EventHandler`](../modules/harlem_core.md#eventhandler)<`any`\> | The handler that will be called when the event is triggered |

#### Returns

`Disposable`

#### Defined in

[core/src/types.ts:171](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L171)

___

### reset

▸ **reset**<`TValue`\>(`branchAccessor?`): `void`

Reset this store back to it's intial state

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `branchAccessor?` | [`BranchAccessor`](../modules/harlem_core.md#branchaccessor)<`TState`, `TValue`\> | An optional function that returns a sub-branch of state to reset |

#### Returns

`void`

#### Defined in

[core/src/types.ts:190](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L190)

___

### snapshot

▸ **snapshot**(): [`StoreSnapshot`](harlem_core.StoreSnapshot.md)<`TState`\>

Take a snapshot of this store's current state

#### Returns

[`StoreSnapshot`](harlem_core.StoreSnapshot.md)<`TState`\>

#### Defined in

[core/src/types.ts:183](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L183)

___

### suppress

▸ **suppress**<`TResult`\>(`callback`): `TResult`

Suppress events emitted from this store for the duration of the function callback

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | () => `TResult` | A function during which all events will be suppressed on this store |

#### Returns

`TResult`

#### Defined in

[core/src/types.ts:178](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L178)
