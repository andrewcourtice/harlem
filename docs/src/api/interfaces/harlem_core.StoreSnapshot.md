[Harlem - v1.0.0](../index.md) / [@harlem/core](../modules/harlem_core.md) / StoreSnapshot

# Interface: StoreSnapshot<TState\>

[@harlem/core](../modules/harlem_core.md).StoreSnapshot

## Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends [`BaseState`](../modules/harlem_core.md#basestate) |

## Table of contents

### Accessors

- [state](harlem_core.StoreSnapshot.md#state)

### Methods

- [apply](harlem_core.StoreSnapshot.md#apply)

## Accessors

### state

• `get` **state**(): `TState`

A readonly copy of state in the snapshot

#### Returns

`TState`

#### Defined in

[core/src/types.ts:122](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L122)

## Methods

### apply

▸ **apply**<`TValue`\>(`branchAccessor?`, `mutationName?`): `void`

Apply the current snapshot's state to the store. This will essentially overwrite any changes to state since this snapshot was taken.

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `branchAccessor?` | [`BranchAccessor`](../modules/harlem_core.md#branchaccessor)<`TState`, `TValue`\> | An optional branch accessor to apply a partial part of this snapshot to the store. |
| `mutationName?` | `string` | An optional mutation name to use when applying the snapshot. This is useful for identifying snapshot applications in the Harlem devtools. |

#### Returns

`void`

#### Defined in

[core/src/types.ts:129](https://github.com/andrewcourtice/harlem/blob/1dcd57c/core/src/types.ts#L129)
