[Harlem - v1.0.0](../index.md) / [@harlem/core](../modules/harlem_core.md) / HarlemInstance

# Interface: HarlemInstance

[@harlem/core](../modules/harlem_core.md).HarlemInstance

## Hierarchy

- `Omit`<[`EventBus`](harlem_core.EventBus.md), ``"emit"``\>

  ↳ **`HarlemInstance`**

## Table of contents

### Methods

- [createStore](harlem_core.HarlemInstance.md#createstore)
- [createVuePlugin](harlem_core.HarlemInstance.md#createvueplugin)
- [off](harlem_core.HarlemInstance.md#off)
- [on](harlem_core.HarlemInstance.md#on)
- [once](harlem_core.HarlemInstance.md#once)

## Methods

### createStore

▸ **createStore**<`TState`, `TExtensions`\>(`name`, `state`, `options?`): [`PublicStore`](../modules/harlem_core.md#publicstore)<`TState`, `TExtensions`\>

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
| `TState` | extends [`BaseState`](../modules/harlem_core.md#basestate) |
| `TExtensions` | extends [`Extension`](../modules/harlem_core.md#extension)<`TState`\>[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of this store. |
| `state` | `TState` | The initial state of this store. |
| `options?` | `Partial`<[`StoreOptions`](harlem_core.StoreOptions.md)<`TState`, `TExtensions`\>\> | Additional options used to configure this store. |

#### Returns

[`PublicStore`](../modules/harlem_core.md#publicstore)<`TState`, `TExtensions`\>

#### Defined in

[core/src/types.ts:421](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L421)

___

### createVuePlugin

▸ **createVuePlugin**(`options?`): `Plugin_2`

Attach Harlem to a Vue application. This is required for Harlem plugins to be usable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`HarlemOptions`](harlem_core.HarlemOptions.md) | Harlem options |

#### Returns

`Plugin_2`

#### Defined in

[core/src/types.ts:393](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L393)

___

### off

▸ **off**(`event`, `handler`): `void`

Unsubscribe from an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | The name of the event to unsubscribe from |
| `handler` | [`EventHandler`](../modules/harlem_core.md#eventhandler)<`any`\> | The handler the was registered to the event |

#### Returns

`void`

#### Inherited from

Omit.off

#### Defined in

[core/src/types.ts:73](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L73)

___

### on

▸ **on**(`event`, `handler`): `Disposable`

Subscribe to an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | The name of the event to subscribe to |
| `handler` | [`EventHandler`](../modules/harlem_core.md#eventhandler)<`any`\> | A handler called when the event is fired |

#### Returns

`Disposable`

#### Inherited from

Omit.on

#### Defined in

[core/src/types.ts:57](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L57)

___

### once

▸ **once**(`event`, `handler`): `Disposable`

Subscribe to an event. Once the event is fired once, this listener is automatically detached.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | The name of the event to subscribe to |
| `handler` | [`EventHandler`](../modules/harlem_core.md#eventhandler)<`any`\> | A handler called when the event is fired |

#### Returns

`Disposable`

#### Inherited from

Omit.once

#### Defined in

[core/src/types.ts:65](https://github.com/andrewcourtice/harlem/blob/ca8d117/core/src/types.ts#L65)
