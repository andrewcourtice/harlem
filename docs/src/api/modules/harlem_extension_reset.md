[Harlem - v1.0.0](../index.md) / @harlem/extension-reset

# Module: @harlem/extension-reset

## Table of contents

### Type Aliases

- [BranchCallback](harlem_extension_reset.md#branchcallback)

### Functions

- [default](harlem_extension_reset.md#default)

## Type Aliases

### BranchCallback

Ƭ **BranchCallback**<`TState`, `TData`\>: (`state`: `ReadState`<`TState`\> \| `WriteState`<`TState`\>) => `TData`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends `BaseState` |
| `TData` | extends `BaseState` |

#### Type declaration

▸ (`state`): `TData`

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `ReadState`<`TState`\> \| `WriteState`<`TState`\> |

##### Returns

`TData`

#### Defined in

[extensions/reset/src/types.ts:7](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/reset/src/types.ts#L7)

## Functions

### default

▸ **default**<`TState`\>(): (`store`: `InternalStore`<`TState`\>) => { `reset`: <TBranchState\>(`branchCallback`: [`BranchCallback`](harlem_extension_reset.md#branchcallback)<`TState`, `TBranchState`\>) => `void`  }

**`Deprecated`**

The reset extension is now deprecated. Reset functionaility is now part of the core store.

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
| `reset` | <TBranchState\>(`branchCallback`: [`BranchCallback`](harlem_extension_reset.md#branchcallback)<`TState`, `TBranchState`\>) => `void` |

#### Defined in

[extensions/reset/src/index.ts:26](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/reset/src/index.ts#L26)
