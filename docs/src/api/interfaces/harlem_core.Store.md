[Harlem - v1.0.0](../index.md) / [@harlem/core](../modules/harlem_core.md) / Store

# Interface: Store<TState\>

[@harlem/core](../modules/harlem_core.md).Store

## Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](../modules/harlem_core.md#basestate) |

## Hierarchy

- [`StoreBase`](harlem_core.StoreBase.md)<`TState`\>

  ↳ **`Store`**

## Table of contents

### Properties

- [onActionError](harlem_core.Store.md#onactionerror)
- [onActionSuccess](harlem_core.Store.md#onactionsuccess)
- [onAfterAction](harlem_core.Store.md#onafteraction)
- [onAfterMutation](harlem_core.Store.md#onaftermutation)
- [onBeforeAction](harlem_core.Store.md#onbeforeaction)
- [onBeforeMutation](harlem_core.Store.md#onbeforemutation)
- [onMutationError](harlem_core.Store.md#onmutationerror)
- [onMutationSuccess](harlem_core.Store.md#onmutationsuccess)
- [state](harlem_core.Store.md#state)

### Methods

- [action](harlem_core.Store.md#action)
- [destroy](harlem_core.Store.md#destroy)
- [getter](harlem_core.Store.md#getter)
- [mutation](harlem_core.Store.md#mutation)
- [on](harlem_core.Store.md#on)
- [once](harlem_core.Store.md#once)
- [reset](harlem_core.Store.md#reset)
- [snapshot](harlem_core.Store.md#snapshot)
- [suppress](harlem_core.Store.md#suppress)

## Properties

### onActionError

• **onActionError**: [`Trigger`](../modules/harlem_core.md#trigger)

The trigger called when an action fails

#### Defined in

[core/src/types.ts:376](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L376)

___

### onActionSuccess

• **onActionSuccess**: [`Trigger`](../modules/harlem_core.md#trigger)

The trigger called upon successful completion of an action

#### Defined in

[core/src/types.ts:371](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L371)

___

### onAfterAction

• **onAfterAction**: [`Trigger`](../modules/harlem_core.md#trigger)

The trigger called after an action runs, regardless of it was successful or not

#### Defined in

[core/src/types.ts:366](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L366)

___

### onAfterMutation

• **onAfterMutation**: [`Trigger`](../modules/harlem_core.md#trigger)

The trigger called after a mutation runs, regardless of it was successful or not

#### Defined in

[core/src/types.ts:346](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L346)

___

### onBeforeAction

• **onBeforeAction**: [`Trigger`](../modules/harlem_core.md#trigger)

The trigger called before an action runs

#### Defined in

[core/src/types.ts:361](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L361)

___

### onBeforeMutation

• **onBeforeMutation**: [`Trigger`](../modules/harlem_core.md#trigger)

The trigger called before a mutation runs

#### Defined in

[core/src/types.ts:341](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L341)

___

### onMutationError

• **onMutationError**: [`Trigger`](../modules/harlem_core.md#trigger)

The trigger called when a mutation fails

#### Defined in

[core/src/types.ts:356](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L356)

___

### onMutationSuccess

• **onMutationSuccess**: [`Trigger`](../modules/harlem_core.md#trigger)

The trigger called upon successful completion of a mutation

#### Defined in

[core/src/types.ts:351](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L351)

___

### state

• **state**: `DeepReadonly`<`TState`\>

The current (readonly) state object

#### Defined in

[core/src/types.ts:336](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L336)

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

#### Inherited from

[StoreBase](harlem_core.StoreBase.md).[action](harlem_core.StoreBase.md#action)

#### Defined in

[core/src/types.ts:155](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L155)

___

### destroy

▸ **destroy**(): `void`

Destroy this store

#### Returns

`void`

#### Inherited from

[StoreBase](harlem_core.StoreBase.md).[destroy](harlem_core.StoreBase.md#destroy)

#### Defined in

[core/src/types.ts:195](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L195)

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

#### Inherited from

[StoreBase](harlem_core.StoreBase.md).[getter](harlem_core.StoreBase.md#getter)

#### Defined in

[core/src/types.ts:139](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L139)

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

#### Inherited from

[StoreBase](harlem_core.StoreBase.md).[mutation](harlem_core.StoreBase.md#mutation)

#### Defined in

[core/src/types.ts:147](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L147)

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

#### Inherited from

[StoreBase](harlem_core.StoreBase.md).[on](harlem_core.StoreBase.md#on)

#### Defined in

[core/src/types.ts:163](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L163)

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

#### Inherited from

[StoreBase](harlem_core.StoreBase.md).[once](harlem_core.StoreBase.md#once)

#### Defined in

[core/src/types.ts:171](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L171)

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

#### Inherited from

[StoreBase](harlem_core.StoreBase.md).[reset](harlem_core.StoreBase.md#reset)

#### Defined in

[core/src/types.ts:190](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L190)

___

### snapshot

▸ **snapshot**(): [`StoreSnapshot`](harlem_core.StoreSnapshot.md)<`TState`\>

Take a snapshot of this store's current state

#### Returns

[`StoreSnapshot`](harlem_core.StoreSnapshot.md)<`TState`\>

#### Inherited from

[StoreBase](harlem_core.StoreBase.md).[snapshot](harlem_core.StoreBase.md#snapshot)

#### Defined in

[core/src/types.ts:183](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L183)

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

#### Inherited from

[StoreBase](harlem_core.StoreBase.md).[suppress](harlem_core.StoreBase.md#suppress)

#### Defined in

[core/src/types.ts:178](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L178)
