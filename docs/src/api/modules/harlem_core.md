[Harlem - v1.0.0](../index.md) / @harlem/core

# Module: @harlem/core

## Table of contents

### Interfaces

- [EventBus](../interfaces/harlem_core.EventBus.md)
- [EventPayload](../interfaces/harlem_core.EventPayload.md)
- [HarlemInstance](../interfaces/harlem_core.HarlemInstance.md)
- [HarlemOptions](../interfaces/harlem_core.HarlemOptions.md)
- [InternalStore](../interfaces/harlem_core.InternalStore.md)
- [InternalStoreOptions](../interfaces/harlem_core.InternalStoreOptions.md)
- [Store](../interfaces/harlem_core.Store.md)
- [StoreBase](../interfaces/harlem_core.StoreBase.md)
- [StoreOptions](../interfaces/harlem_core.StoreOptions.md)
- [StoreProducers](../interfaces/harlem_core.StoreProducers.md)
- [StoreRegistration](../interfaces/harlem_core.StoreRegistration.md)
- [StoreSnapshot](../interfaces/harlem_core.StoreSnapshot.md)
- [TriggerEventData](../interfaces/harlem_core.TriggerEventData.md)

### Type Aliases

- [Action](harlem_core.md#action)
- [ActionBody](harlem_core.md#actionbody)
- [BaseState](harlem_core.md#basestate)
- [BranchAccessor](harlem_core.md#branchaccessor)
- [EventHandler](harlem_core.md#eventhandler)
- [Extension](harlem_core.md#extension)
- [ExtensionAPIs](harlem_core.md#extensionapis)
- [Getter](harlem_core.md#getter)
- [HarlemPlugin](harlem_core.md#harlemplugin)
- [InternalStores](harlem_core.md#internalstores)
- [Mutation](harlem_core.md#mutation)
- [Mutator](harlem_core.md#mutator)
- [PublicStore](harlem_core.md#publicstore)
- [ReadState](harlem_core.md#readstate)
- [RegistrationType](harlem_core.md#registrationtype)
- [RegistrationValueProducer](harlem_core.md#registrationvalueproducer)
- [StoreProducer](harlem_core.md#storeproducer)
- [StoreRegistrations](harlem_core.md#storeregistrations)
- [Trigger](harlem_core.md#trigger)
- [TriggerHandler](harlem_core.md#triggerhandler)
- [WriteState](harlem_core.md#writestate)

### Variables

- [EVENTS](harlem_core.md#events)
- [INTERNAL](harlem_core.md#internal)
- [PRODUCERS](harlem_core.md#producers)

### Functions

- [createInstance](harlem_core.md#createinstance)
- [createStore](harlem_core.md#createstore)
- [createVuePlugin](harlem_core.md#createvueplugin)
- [off](harlem_core.md#off)
- [on](harlem_core.md#on)
- [once](harlem_core.md#once)

## Type Aliases

### Action

Ƭ **Action**<`TPayload`, `TResult`\>: `undefined` extends `TPayload` ? (`payload?`: `TPayload`) => `Promise`<`TResult`\> : (`payload`: `TPayload`) => `Promise`<`TResult`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TPayload` | `TPayload` |
| `TResult` | `void` |

#### Defined in

[core/src/types.ts:34](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L34)

___

### ActionBody

Ƭ **ActionBody**<`TState`, `TPayload`, `TResult`\>: (`payload`: `TPayload`, `mutator`: (`mutate`: [`Mutator`](harlem_core.md#mutator)<`TState`, `undefined`, `void`\>) => `void`) => `Promise`<`TResult`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](harlem_core.md#basestate) |
| `TPayload` | `undefined` |
| `TResult` | `void` |

#### Type declaration

▸ (`payload`, `mutator`): `Promise`<`TResult`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `TPayload` |
| `mutator` | (`mutate`: [`Mutator`](harlem_core.md#mutator)<`TState`, `undefined`, `void`\>) => `void` |

##### Returns

`Promise`<`TResult`\>

#### Defined in

[core/src/types.ts:33](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L33)

___

### BaseState

Ƭ **BaseState**: `Record`<`PropertyKey`, `any`\>

#### Defined in

[core/src/types.ts:23](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L23)

___

### BranchAccessor

Ƭ **BranchAccessor**<`TState`, `TValue`\>: (`state`: [`ReadState`](harlem_core.md#readstate)<`TState`\>) => `TValue`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](harlem_core.md#basestate) |
| `TValue` | `TValue` |

#### Type declaration

▸ (`state`): `TValue`

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`ReadState`](harlem_core.md#readstate)<`TState`\> |

##### Returns

`TValue`

#### Defined in

[core/src/types.ts:38](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L38)

___

### EventHandler

Ƭ **EventHandler**<`TData`\>: (`payload?`: [`EventPayload`](../interfaces/harlem_core.EventPayload.md)<`TData`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TData` | `any` |

#### Type declaration

▸ (`payload?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `payload?` | [`EventPayload`](../interfaces/harlem_core.EventPayload.md)<`TData`\> |

##### Returns

`void`

#### Defined in

[core/src/types.ts:35](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L35)

___

### Extension

Ƭ **Extension**<`TState`\>: (`store`: [`InternalStore`](../interfaces/harlem_core.InternalStore.md)<`TState`\>) => `Record`<`string`, `any`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](harlem_core.md#basestate) |

#### Type declaration

▸ (`store`): `Record`<`string`, `any`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`InternalStore`](../interfaces/harlem_core.InternalStore.md)<`TState`\> |

##### Returns

`Record`<`string`, `any`\>

#### Defined in

[core/src/types.ts:41](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L41)

___

### ExtensionAPIs

Ƭ **ExtensionAPIs**<`TExtensions`\>: `Record`<`string`, `any`\> extends `UnionToIntersection`<`ReturnType`<`TExtensions`[`number`]\>\> ? `unknown` : `UnionToIntersection`<`ReturnType`<`TExtensions`[`number`]\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TExtensions` | extends [`Extension`](harlem_core.md#extension)<[`BaseState`](harlem_core.md#basestate)\>[] |

#### Defined in

[core/src/types.ts:42](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L42)

___

### Getter

Ƭ **Getter**<`TState`, `TResult`\>: (`state`: [`ReadState`](harlem_core.md#readstate)<`TState`\>) => `TResult`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](harlem_core.md#basestate) |
| `TResult` | `TResult` |

#### Type declaration

▸ (`state`): `TResult`

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`ReadState`](harlem_core.md#readstate)<`TState`\> |

##### Returns

`TResult`

#### Defined in

[core/src/types.ts:30](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L30)

___

### HarlemPlugin

Ƭ **HarlemPlugin**: (`app`: `App`, `eventBus`: [`EventBus`](../interfaces/harlem_core.EventBus.md), `stores`: [`InternalStores`](harlem_core.md#internalstores)) => `void`

#### Type declaration

▸ (`app`, `eventBus`, `stores`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `App` |
| `eventBus` | [`EventBus`](../interfaces/harlem_core.EventBus.md) |
| `stores` | [`InternalStores`](harlem_core.md#internalstores) |

##### Returns

`void`

#### Defined in

[core/src/types.ts:40](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L40)

___

### InternalStores

Ƭ **InternalStores**: `Map`<`string`, [`InternalStore`](../interfaces/harlem_core.InternalStore.md)<[`BaseState`](harlem_core.md#basestate)\>\>

#### Defined in

[core/src/types.ts:39](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L39)

___

### Mutation

Ƭ **Mutation**<`TPayload`, `TResult`\>: `undefined` extends `TPayload` ? (`payload?`: `TPayload`) => `TResult` : (`payload`: `TPayload`) => `TResult`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TPayload` | `TPayload` |
| `TResult` | `void` |

#### Defined in

[core/src/types.ts:32](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L32)

___

### Mutator

Ƭ **Mutator**<`TState`, `TPayload`, `TResult`\>: (`state`: [`WriteState`](harlem_core.md#writestate)<`TState`\>, `payload`: `TPayload`) => `TResult`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](harlem_core.md#basestate) |
| `TPayload` | `TPayload` |
| `TResult` | `void` |

#### Type declaration

▸ (`state`, `payload`): `TResult`

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`WriteState`](harlem_core.md#writestate)<`TState`\> |
| `payload` | `TPayload` |

##### Returns

`TResult`

#### Defined in

[core/src/types.ts:31](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L31)

___

### PublicStore

Ƭ **PublicStore**<`TState`, `TExtensions`\>: `Omit`<[`Store`](../interfaces/harlem_core.Store.md)<`TState`\>, keyof [`ExtensionAPIs`](harlem_core.md#extensionapis)<`TExtensions`\>\> & [`ExtensionAPIs`](harlem_core.md#extensionapis)<`TExtensions`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](harlem_core.md#basestate) |
| `TExtensions` | extends [`Extension`](harlem_core.md#extension)<`TState`\>[] |

#### Defined in

[core/src/types.ts:43](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L43)

___

### ReadState

Ƭ **ReadState**<`TState`\>: `DeepReadonly`<`TState`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](harlem_core.md#basestate) |

#### Defined in

[core/src/types.ts:25](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L25)

___

### RegistrationType

Ƭ **RegistrationType**: ``"ref"`` \| ``"reactive"`` \| ``"computed"`` \| ``"other"``

#### Defined in

[core/src/types.ts:28](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L28)

___

### RegistrationValueProducer

Ƭ **RegistrationValueProducer**: () => `unknown`

#### Type declaration

▸ (): `unknown`

##### Returns

`unknown`

#### Defined in

[core/src/types.ts:29](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L29)

___

### StoreProducer

Ƭ **StoreProducer**<`TState`\>: keyof [`StoreProducers`](../interfaces/harlem_core.StoreProducers.md)<`TState`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](harlem_core.md#basestate) |

#### Defined in

[core/src/types.ts:24](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L24)

___

### StoreRegistrations

Ƭ **StoreRegistrations**: `Record`<`string`, `Map`<`string`, [`StoreRegistration`](../interfaces/harlem_core.StoreRegistration.md)\>\>

#### Defined in

[core/src/types.ts:27](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L27)

___

### Trigger

Ƭ **Trigger**: <TPayload, TResult\>(`matcher`: `Matcher` \| `Matchable`, `handler`: [`TriggerHandler`](harlem_core.md#triggerhandler)<`TPayload`, `TResult`\>) => `Disposable`

#### Type declaration

▸ <`TPayload`, `TResult`\>(`matcher`, `handler`): `Disposable`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `TPayload` | `any` |
| `TResult` | `any` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `matcher` | `Matcher` \| `Matchable` |
| `handler` | [`TriggerHandler`](harlem_core.md#triggerhandler)<`TPayload`, `TResult`\> |

##### Returns

`Disposable`

#### Defined in

[core/src/types.ts:36](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L36)

___

### TriggerHandler

Ƭ **TriggerHandler**<`TPayload`, `TResult`\>: (`data`: [`TriggerEventData`](../interfaces/harlem_core.TriggerEventData.md)<`TPayload`, `TResult`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TPayload` | `any` |
| `TResult` | `any` |

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`TriggerEventData`](../interfaces/harlem_core.TriggerEventData.md)<`TPayload`, `TResult`\> |

##### Returns

`void`

#### Defined in

[core/src/types.ts:37](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L37)

___

### WriteState

Ƭ **WriteState**<`TState`\>: `TState`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](harlem_core.md#basestate) |

#### Defined in

[core/src/types.ts:26](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L26)

## Variables

### EVENTS

• `Const` **EVENTS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `action` | { `after`: ``"action:after"`` = 'action:after'; `before`: ``"action:before"`` = 'action:before'; `error`: ``"action:error"`` = 'action:error'; `success`: ``"action:success"`` = 'action:success' } |
| `action.after` | ``"action:after"`` |
| `action.before` | ``"action:before"`` |
| `action.error` | ``"action:error"`` |
| `action.success` | ``"action:success"`` |
| `core` | { `installed`: ``"core:installed"`` = 'core:installed' } |
| `core.installed` | ``"core:installed"`` |
| `devtools` | { `reset`: ``"devtools:reset"`` = 'devtools:reset'; `update`: ``"devtools:update"`` = 'devtools:update' } |
| `devtools.reset` | ``"devtools:reset"`` |
| `devtools.update` | ``"devtools:update"`` |
| `mutation` | { `after`: ``"mutation:after"`` = 'mutation:after'; `before`: ``"mutation:before"`` = 'mutation:before'; `error`: ``"mutation:error"`` = 'mutation:error'; `success`: ``"mutation:success"`` = 'mutation:success' } |
| `mutation.after` | ``"mutation:after"`` |
| `mutation.before` | ``"mutation:before"`` |
| `mutation.error` | ``"mutation:error"`` |
| `mutation.success` | ``"mutation:success"`` |
| `ssr` | { `initClient`: ``"ssr:init:client"`` = 'ssr:init:client'; `initServer`: ``"ssr:init:server"`` = 'ssr:init:server' } |
| `ssr.initClient` | ``"ssr:init:client"`` |
| `ssr.initServer` | ``"ssr:init:server"`` |
| `store` | { `created`: ``"store:created"`` = 'store:created'; `destroyed`: ``"store:destroyed"`` = 'store:destroyed'; `ready`: ``"store:ready"`` = 'store:ready' } |
| `store.created` | ``"store:created"`` |
| `store.destroyed` | ``"store:destroyed"`` |
| `store.ready` | ``"store:ready"`` |

#### Defined in

[core/src/constants.ts:11](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/constants.ts#L11)

___

### INTERNAL

• `Const` **INTERNAL**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `pattern` | `RegExp` |
| `prefix` | ``"$harlem:"`` |

#### Defined in

[core/src/constants.ts:53](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/constants.ts#L53)

___

### PRODUCERS

• `Const` **PRODUCERS**: [`StoreProducers`](../interfaces/harlem_core.StoreProducers.md)<`any`\>

#### Defined in

[core/src/constants.ts:47](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/constants.ts#L47)

## Functions

### createInstance

▸ **createInstance**(): [`HarlemInstance`](../interfaces/harlem_core.HarlemInstance.md)

Create a new instance of Harlem. This is useful in multi-app scenarios.

#### Returns

[`HarlemInstance`](../interfaces/harlem_core.HarlemInstance.md)

#### Defined in

[core/src/index.ts:47](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/index.ts#L47)

___

### createStore

▸ **createStore**<`TState`, `TExtensions`\>(`name`, `state`, `options?`): [`PublicStore`](harlem_core.md#publicstore)<`TState`, `TExtensions`\>

Create a new Harlem store.

**`Example`**

```ts
// Define the initial state of this store
const STATE = {
    firstName: 'John',
    lastName: 'Smith'
};

// Create the store with the initial state and any options/extensions
const {
    state,
    getter,
    mutation,
    action
} = createStore('app', STATE, {
    extensions: [
        actionExtension()
    ]
})
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](harlem_core.md#basestate) |
| `TExtensions` | extends [`Extension`](harlem_core.md#extension)<`TState`\>[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of this store. |
| `state` | `TState` | The initial state of this store. |
| `options?` | `Partial`<[`StoreOptions`](../interfaces/harlem_core.StoreOptions.md)<`TState`, `TExtensions`\>\> | Additional options used to configure this store. |

#### Returns

[`PublicStore`](harlem_core.md#publicstore)<`TState`, `TExtensions`\>

#### Defined in

[core/src/types.ts:421](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L421)

___

### createVuePlugin

▸ **createVuePlugin**(`options?`): `Plugin_2`

Attach Harlem to a Vue application. This is required for Harlem plugins to be usable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`HarlemOptions`](../interfaces/harlem_core.HarlemOptions.md) | Harlem options |

#### Returns

`Plugin_2`

#### Defined in

[core/src/types.ts:393](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L393)

___

### off

▸ **off**(`event`, `handler`): `void`

Unsubscribe from an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | The name of the event to unsubscribe from |
| `handler` | [`EventHandler`](harlem_core.md#eventhandler)<`any`\> | The handler the was registered to the event |

#### Returns

`void`

#### Defined in

[core/src/types.ts:73](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L73)

___

### on

▸ **on**(`event`, `handler`): `Disposable`

Subscribe to an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | The name of the event to subscribe to |
| `handler` | [`EventHandler`](harlem_core.md#eventhandler)<`any`\> | A handler called when the event is fired |

#### Returns

`Disposable`

#### Defined in

[core/src/types.ts:57](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L57)

___

### once

▸ **once**(`event`, `handler`): `Disposable`

Subscribe to an event. Once the event is fired once, this listener is automatically detached.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | The name of the event to subscribe to |
| `handler` | [`EventHandler`](harlem_core.md#eventhandler)<`any`\> | A handler called when the event is fired |

#### Returns

`Disposable`

#### Defined in

[core/src/types.ts:65](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L65)
