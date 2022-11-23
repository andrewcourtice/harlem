[Harlem - v1.0.0](../index.md) / @harlem/extension-lazy

# Module: @harlem/extension-lazy

## Table of contents

### Type Aliases

- [ComputedAsyncCallback](harlem_extension_lazy.md#computedasynccallback)
- [ComputedAsyncResult](harlem_extension_lazy.md#computedasyncresult)
- [InvalidateCallback](harlem_extension_lazy.md#invalidatecallback)
- [LazyBody](harlem_extension_lazy.md#lazybody)

### Functions

- [default](harlem_extension_lazy.md#default)

## Type Aliases

### ComputedAsyncCallback

Ƭ **ComputedAsyncCallback**<`TResult`\>: (`onInvalidate`: [`InvalidateCallback`](harlem_extension_lazy.md#invalidatecallback)) => `Promise`<`TResult`\>

#### Type parameters

| Name |
| :------ |
| `TResult` |

#### Type declaration

▸ (`onInvalidate`): `Promise`<`TResult`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `onInvalidate` | [`InvalidateCallback`](harlem_extension_lazy.md#invalidatecallback) |

##### Returns

`Promise`<`TResult`\>

#### Defined in

[extensions/lazy/src/types.ts:11](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/lazy/src/types.ts#L11)

___

### ComputedAsyncResult

Ƭ **ComputedAsyncResult**<`TResult`\>: [value: ComputedRef<TResult\>, isEvaluating: ComputedRef<boolean\>]

#### Type parameters

| Name |
| :------ |
| `TResult` |

#### Defined in

[extensions/lazy/src/types.ts:12](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/lazy/src/types.ts#L12)

___

### InvalidateCallback

Ƭ **InvalidateCallback**: (...`args`: `any`[]) => `void`

#### Type declaration

▸ (...`args`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`void`

#### Defined in

[extensions/lazy/src/types.ts:10](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/lazy/src/types.ts#L10)

___

### LazyBody

Ƭ **LazyBody**<`TState`, `TResult`\>: (`state`: `ReadState`<`TState`\>, `onInvalidate`: [`InvalidateCallback`](harlem_extension_lazy.md#invalidatecallback)) => `Promise`<`TResult`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends `BaseState` |
| `TResult` | `TResult` |

#### Type declaration

▸ (`state`, `onInvalidate`): `Promise`<`TResult`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `ReadState`<`TState`\> |
| `onInvalidate` | [`InvalidateCallback`](harlem_extension_lazy.md#invalidatecallback) |

##### Returns

`Promise`<`TResult`\>

#### Defined in

[extensions/lazy/src/types.ts:13](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/lazy/src/types.ts#L13)

## Functions

### default

▸ **default**<`TState`\>(): (`store`: `InternalStore`<`TState`\>) => { `lazy`: <TResult\>(`name`: `string`, `body`: [`LazyBody`](harlem_extension_lazy.md#lazybody)<`TState`, `TResult`\>, `defaultValue?`: `TResult`) => [`ComputedAsyncResult`](harlem_extension_lazy.md#computedasyncresult)<`undefined` \| `TResult`\>  }

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
| `lazy` | <TResult\>(`name`: `string`, `body`: [`LazyBody`](harlem_extension_lazy.md#lazybody)<`TState`, `TResult`\>, `defaultValue?`: `TResult`) => [`ComputedAsyncResult`](harlem_extension_lazy.md#computedasyncresult)<`undefined` \| `TResult`\> |

#### Defined in

[extensions/lazy/src/index.ts:27](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/lazy/src/index.ts#L27)
