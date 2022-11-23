[Harlem - v1.0.0](../index.md) / @harlem/extension-compose

# Module: @harlem/extension-compose

## Table of contents

### Type Aliases

- [Accessor](harlem_extension_compose.md#accessor)
- [Getter](harlem_extension_compose.md#getter)
- [ListenersAccessor](harlem_extension_compose.md#listenersaccessor)
- [Producer](harlem_extension_compose.md#producer)
- [Setter](harlem_extension_compose.md#setter)

### Functions

- [default](harlem_extension_compose.md#default)
- [useListeners](harlem_extension_compose.md#uselisteners)

## Type Aliases

### Accessor

Ƭ **Accessor**<`TState`, `TValue`\>: (`state`: `TState`) => `TValue`

#### Type parameters

| Name |
| :------ |
| `TState` |
| `TValue` |

#### Type declaration

▸ (`state`): `TValue`

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `TState` |

##### Returns

`TValue`

#### Defined in

[extensions/compose/src/types.ts:9](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/compose/src/types.ts#L9)

___

### Getter

Ƭ **Getter**<`TValue`\>: () => `DeepReadonly`<`TValue`\>

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Type declaration

▸ (): `DeepReadonly`<`TValue`\>

##### Returns

`DeepReadonly`<`TValue`\>

#### Defined in

[extensions/compose/src/types.ts:11](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/compose/src/types.ts#L11)

___

### ListenersAccessor

Ƭ **ListenersAccessor**: `Disposable` \| `Disposable`[] \| () => `Disposable` \| `Disposable`[]

#### Defined in

[extensions/compose/src/types.ts:13](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/compose/src/types.ts#L13)

___

### Producer

Ƭ **Producer**<`TState`, `TValue`\>: (`state`: `DeepReadonly`<`TState`\>) => `TValue`

#### Type parameters

| Name |
| :------ |
| `TState` |
| `TValue` |

#### Type declaration

▸ (`state`): `TValue`

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `DeepReadonly`<`TState`\> |

##### Returns

`TValue`

#### Defined in

[extensions/compose/src/types.ts:10](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/compose/src/types.ts#L10)

___

### Setter

Ƭ **Setter**<`TValue`\>: (`value`: `TValue` \| [`Producer`](harlem_extension_compose.md#producer)<`TValue`, `TValue`\>) => `void`

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `TValue` \| [`Producer`](harlem_extension_compose.md#producer)<`TValue`, `TValue`\> |

##### Returns

`void`

#### Defined in

[extensions/compose/src/types.ts:12](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/compose/src/types.ts#L12)

## Functions

### default

▸ **default**<`TState`\>(): (`store`: `InternalStore`<`TState`\>) => { `computeState`: <TValue\>(`accessor`: [`Accessor`](harlem_extension_compose.md#accessor)<`TState`, `TValue`\>, `mutationName?`: `string`) => `WritableComputedRef`<`TValue`\> ; `useListeners`: (`listeners`: [`ListenersAccessor`](harlem_extension_compose.md#listenersaccessor)) => `void` ; `useState`: <TValue\>(`accessor`: [`Accessor`](harlem_extension_compose.md#accessor)<`TState`, `TValue`\>, `mutationName?`: `string`) => [[`Getter`](harlem_extension_compose.md#getter)<`TValue`\>, [`Setter`](harlem_extension_compose.md#setter)<`TValue`\>]  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends `BaseState` |

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
| `computeState` | <TValue\>(`accessor`: [`Accessor`](harlem_extension_compose.md#accessor)<`TState`, `TValue`\>, `mutationName?`: `string`) => `WritableComputedRef`<`TValue`\> |
| `useListeners` | (`listeners`: [`ListenersAccessor`](harlem_extension_compose.md#listenersaccessor)) => `void` |
| `useState` | <TValue\>(`accessor`: [`Accessor`](harlem_extension_compose.md#accessor)<`TState`, `TValue`\>, `mutationName?`: `string`) => [[`Getter`](harlem_extension_compose.md#getter)<`TValue`\>, [`Setter`](harlem_extension_compose.md#setter)<`TValue`\>] |

#### Defined in

[extensions/compose/src/index.ts:44](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/compose/src/index.ts#L44)

___

### useListeners

▸ **useListeners**(`listeners`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listeners` | [`ListenersAccessor`](harlem_extension_compose.md#listenersaccessor) |

#### Returns

`void`

#### Defined in

[extensions/compose/src/index.ts:34](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/compose/src/index.ts#L34)
