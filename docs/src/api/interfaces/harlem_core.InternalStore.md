[Harlem - v1.0.0](../index.md) / [@harlem/core](../modules/harlem_core.md) / InternalStore

# Interface: InternalStore<TState\>

[@harlem/core](../modules/harlem_core.md).InternalStore

## Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](../modules/harlem_core.md#basestate) = [`BaseState`](../modules/harlem_core.md#basestate) |

## Hierarchy

- [`StoreBase`](harlem_core.StoreBase.md)<`TState`\>

  ↳ **`InternalStore`**

## Table of contents

### Properties

- [allowsOverwrite](harlem_core.InternalStore.md#allowsoverwrite)
- [flags](harlem_core.InternalStore.md#flags)
- [name](harlem_core.InternalStore.md#name)
- [producers](harlem_core.InternalStore.md#producers)
- [registrations](harlem_core.InternalStore.md#registrations)
- [state](harlem_core.InternalStore.md#state)

### Methods

- [action](harlem_core.InternalStore.md#action)
- [destroy](harlem_core.InternalStore.md#destroy)
- [emit](harlem_core.InternalStore.md#emit)
- [getRegistration](harlem_core.InternalStore.md#getregistration)
- [getter](harlem_core.InternalStore.md#getter)
- [hasRegistration](harlem_core.InternalStore.md#hasregistration)
- [mutation](harlem_core.InternalStore.md#mutation)
- [on](harlem_core.InternalStore.md#on)
- [once](harlem_core.InternalStore.md#once)
- [register](harlem_core.InternalStore.md#register)
- [reset](harlem_core.InternalStore.md#reset)
- [snapshot](harlem_core.InternalStore.md#snapshot)
- [suppress](harlem_core.InternalStore.md#suppress)
- [track](harlem_core.InternalStore.md#track)
- [unregister](harlem_core.InternalStore.md#unregister)
- [write](harlem_core.InternalStore.md#write)

## Properties

### allowsOverwrite

• `Readonly` **allowsOverwrite**: `boolean`

A boolean indicating whether this store allows overwriting duplicate registrations

#### Defined in

[core/src/types.ts:230](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L230)

___

### flags

• `Readonly` **flags**: `Map`<`string`, `unknown`\>

Flags defined on this store

#### Defined in

[core/src/types.ts:240](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L240)

___

### name

• `Readonly` **name**: `string`

The name of this store

#### Defined in

[core/src/types.ts:225](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L225)

___

### producers

• `Readonly` **producers**: [`StoreProducers`](harlem_core.StoreProducers.md)<`TState`\>

The producers for this store

#### Defined in

[core/src/types.ts:245](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L245)

___

### registrations

• `Readonly` **registrations**: [`StoreRegistrations`](../modules/harlem_core.md#storeregistrations)

The items registered with this store

#### Defined in

[core/src/types.ts:250](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L250)

___

### state

• `Readonly` **state**: `DeepReadonly`<`TState`\>

The current (readonly) state object

#### Defined in

[core/src/types.ts:235](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L235)

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

### emit

▸ **emit**(`event`, `sender`, `data`): `void`

Emit an event from this store

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | The name of the event to emit |
| `sender` | `string` | The name of the sender |
| `data` | `any` | Any data to be emitted with this event |

#### Returns

`void`

#### Defined in

[core/src/types.ts:293](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L293)

___

### getRegistration

▸ **getRegistration**(`group`, `name`): `undefined` \| [`StoreRegistration`](harlem_core.StoreRegistration.md)

Gets a registered item with the specified name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `group` | `string` | The group this item is registered under |
| `name` | `string` | The name of the registration |

#### Returns

`undefined` \| [`StoreRegistration`](harlem_core.StoreRegistration.md)

#### Defined in

[core/src/types.ts:266](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L266)

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

### hasRegistration

▸ **hasRegistration**(`group`, `name`): `boolean`

Checks whether an item with the specified name is registered under the specified group on this store

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `group` | `string` | The group this item is registered under |
| `name` | `string` | The name of the registration |

#### Returns

`boolean`

#### Defined in

[core/src/types.ts:258](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L258)

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

### register

▸ **register**(`group`, `name`, `valueProducer`, `type?`): `void`

Register a new item on this store

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `group` | `string` | The group this item will be registered under |
| `name` | `string` | The name of this registration |
| `valueProducer` | [`RegistrationValueProducer`](../modules/harlem_core.md#registrationvalueproducer) | A function returning the value that represents this registration |
| `type?` | [`RegistrationType`](../modules/harlem_core.md#registrationtype) | The type of registration this is |

#### Returns

`void`

#### Defined in

[core/src/types.ts:276](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L276)

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

___

### track

▸ **track**<`TResult`\>(`callback`): `TResult`

Register reactive effects with this store to be disposed when the store is destroyed

#### Type parameters

| Name |
| :------ |
| `TResult` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | () => `TResult` | A function during which reactive effects will be tracked |

#### Returns

`TResult`

#### Defined in

[core/src/types.ts:300](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L300)

___

### unregister

▸ **unregister**(`group`, `name`): `void`

Remove a registration from this store

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `group` | `string` | The group this item is registered under |
| `name` | `string` | The name of the registration |

#### Returns

`void`

#### Defined in

[core/src/types.ts:284](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L284)

___

### write

▸ **write**<`TResult`\>(`name`, `sender`, `mutator`, `suppress?`): `TResult`

Perform a write operation on this store

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name that will be used for this mutation operation |
| `sender` | `string` | The sender of the mutation |
| `mutator` | [`Mutator`](../modules/harlem_core.md#mutator)<`TState`, `undefined`, `TResult`\> | A function which will be used to mutate state |
| `suppress?` | `boolean` | A boolean indication whether to suppress events for this mutation |

#### Returns

`TResult`

#### Defined in

[core/src/types.ts:310](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L310)
