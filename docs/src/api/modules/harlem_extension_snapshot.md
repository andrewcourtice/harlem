[Harlem - v1.0.0](../index.md) / @harlem/extension-snapshot

# Module: @harlem/extension-snapshot

## Table of contents

### Interfaces

- [Options](../interfaces/harlem_extension_snapshot.Options.md)
- [Snapshot](../interfaces/harlem_extension_snapshot.Snapshot.md)

### Type Aliases

- [BranchCallback](harlem_extension_snapshot.md#branchcallback)

### Functions

- [default](harlem_extension_snapshot.md#default)

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

[extensions/snapshot/src/types.ts:7](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/snapshot/src/types.ts#L7)

## Functions

### default

▸ **default**<`TState`\>(`options?`): (`store`: `InternalStore`<`TState`\>) => { `snapshot`: <TBranchState\>(`branchCallback`: [`BranchCallback`](harlem_extension_snapshot.md#branchcallback)<`TState`, `TBranchState`\>) => [`Snapshot`](../interfaces/harlem_extension_snapshot.Snapshot.md)<`TBranchState`\>  }

**`Deprecated`**

The snapshot extension is now deprecated. Snapshot functionaility is now part of the core store.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends `BaseState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<[`Options`](../interfaces/harlem_extension_snapshot.Options.md)\> |

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
| `snapshot` | <TBranchState\>(`branchCallback`: [`BranchCallback`](harlem_extension_snapshot.md#branchcallback)<`TState`, `TBranchState`\>) => [`Snapshot`](../interfaces/harlem_extension_snapshot.Snapshot.md)<`TBranchState`\> |

#### Defined in

[extensions/snapshot/src/index.ts:34](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/snapshot/src/index.ts#L34)
