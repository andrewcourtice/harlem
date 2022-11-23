[Harlem - v1.0.0](../index.md) / @harlem/utilities

# Module: @harlem/utilities

## Table of contents

### Interfaces

- [Constructable](../interfaces/harlem_utilities.Constructable.md)
- [Disposable](../interfaces/harlem_utilities.Disposable.md)
- [Matchable](../interfaces/harlem_utilities.Matchable.md)

### Type Aliases

- [Matcher](harlem_utilities.md#matcher)
- [OneOrMore](harlem_utilities.md#oneormore)
- [Predicate](harlem_utilities.md#predicate)
- [RuntimeType](harlem_utilities.md#runtimetype)
- [UnionToIntersection](harlem_utilities.md#uniontointersection)

### Functions

- [functionIdentity](harlem_utilities.md#functionidentity)
- [matchGetFilter](harlem_utilities.md#matchgetfilter)
- [matchNormalise](harlem_utilities.md#matchnormalise)
- [objectClone](harlem_utilities.md#objectclone)
- [objectFromPath](harlem_utilities.md#objectfrompath)
- [objectLock](harlem_utilities.md#objectlock)
- [objectOmit](harlem_utilities.md#objectomit)
- [objectOverwrite](harlem_utilities.md#objectoverwrite)
- [objectSet](harlem_utilities.md#objectset)
- [objectToPath](harlem_utilities.md#objecttopath)
- [objectTrace](harlem_utilities.md#objecttrace)
- [typeGetType](harlem_utilities.md#typegettype)
- [typeIsArray](harlem_utilities.md#typeisarray)
- [typeIsFunction](harlem_utilities.md#typeisfunction)
- [typeIsMatchable](harlem_utilities.md#typeismatchable)
- [typeIsNil](harlem_utilities.md#typeisnil)
- [typeIsObject](harlem_utilities.md#typeisobject)
- [typeIsString](harlem_utilities.md#typeisstring)

## Type Aliases

### Matcher

Ƭ **Matcher**: [`OneOrMore`](harlem_utilities.md#oneormore)<`string` \| `RegExp`\> \| [`Predicate`](harlem_utilities.md#predicate)<`string`\>

#### Defined in

[packages/utilities/src/types.ts:5](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/types.ts#L5)

___

### OneOrMore

Ƭ **OneOrMore**<`TValue`\>: `TValue` \| `TValue`[]

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Defined in

[packages/utilities/src/types.ts:3](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/types.ts#L3)

___

### Predicate

Ƭ **Predicate**<`TValue`\>: (`value`: `TValue`) => `boolean`

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Type declaration

▸ (`value`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `TValue` |

##### Returns

`boolean`

#### Defined in

[packages/utilities/src/types.ts:4](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/types.ts#L4)

___

### RuntimeType

Ƭ **RuntimeType**: ``"boolean"`` \| ``"number"`` \| ``"string"`` \| ``"error"`` \| ``"date"`` \| ``"regexp"`` \| ``"function"`` \| ``"symbol"`` \| ``"array"`` \| ``"object"`` \| ``"map"`` \| ``"set"`` \| ``"null"`` \| ``"undefined"``

#### Defined in

[packages/utilities/src/types.ts:20](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/types.ts#L20)

___

### UnionToIntersection

Ƭ **UnionToIntersection**<`TValue`\>: `TValue` extends `any` ? (`arg`: `TValue`) => `any` : `never` extends (`arg`: infer I) => `void` ? `I` : `never`

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Defined in

[packages/utilities/src/types.ts:1](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/types.ts#L1)

## Functions

### functionIdentity

▸ **functionIdentity**<`TValue`\>(`value`): `TValue`

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `TValue` |

#### Returns

`TValue`

#### Defined in

[packages/utilities/src/function/identity.ts:1](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/function/identity.ts#L1)

___

### matchGetFilter

▸ **matchGetFilter**(`__namedParameters`): [`Predicate`](harlem_utilities.md#predicate)<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`Matchable`](../interfaces/harlem_utilities.Matchable.md) |

#### Returns

[`Predicate`](harlem_utilities.md#predicate)<`string`\>

#### Defined in

[packages/utilities/src/match/get-filter.ts:8](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/match/get-filter.ts#L8)

___

### matchNormalise

▸ **matchNormalise**(`matcher`): [`Predicate`](harlem_utilities.md#predicate)<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `matcher` | [`Matcher`](harlem_utilities.md#matcher) |

#### Returns

[`Predicate`](harlem_utilities.md#predicate)<`string`\>

#### Defined in

[packages/utilities/src/match/normalise.ts:9](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/match/normalise.ts#L9)

___

### objectClone

▸ **objectClone**<`TValue`\>(`value`): `UnwrapRef`<`TValue`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `TValue` |

#### Returns

`UnwrapRef`<`TValue`\>

#### Defined in

[packages/utilities/src/object/clone.ts:88](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/object/clone.ts#L88)

___

### objectFromPath

▸ **objectFromPath**<`TValue`\>(`value`, `path`): `unknown`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `TValue` |
| `path` | `string` \| `PropertyKey`[] |

#### Returns

`unknown`

#### Defined in

[packages/utilities/src/object/from-path.ts:3](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/object/from-path.ts#L3)

___

### objectLock

▸ **objectLock**<`T`\>(`input`, `exclusions`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `T` |
| `exclusions` | keyof `T`[] |

#### Returns

`T`

#### Defined in

[packages/utilities/src/object/lock.ts:1](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/object/lock.ts#L1)

___

### objectOmit

▸ **objectOmit**<`TValue`\>(`value`, `matcher`): `TValue`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `TValue` |
| `matcher` | [`Matcher`](harlem_utilities.md#matcher) |

#### Returns

`TValue`

#### Defined in

[packages/utilities/src/object/omit.ts:7](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/object/omit.ts#L7)

___

### objectOverwrite

▸ **objectOverwrite**<`TTarget`, `TSource`\>(`target`, `source`): `TTarget` \| `TSource`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTarget` | extends `object` |
| `TSource` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `TTarget` |
| `source` | `TSource` |

#### Returns

`TTarget` \| `TSource`

#### Defined in

[packages/utilities/src/object/overwrite.ts:1](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/object/overwrite.ts#L1)

___

### objectSet

▸ **objectSet**<`TTarget`\>(`target`, `path`, `value`): `any`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTarget` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `TTarget` |
| `path` | `string` \| `PropertyKey`[] |
| `value` | `any` |

#### Returns

`any`

#### Defined in

[packages/utilities/src/object/set.ts:6](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/object/set.ts#L6)

___

### objectToPath

▸ **objectToPath**(`nodes`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | `PropertyKey`[] |

#### Returns

`string`

#### Defined in

[packages/utilities/src/object/to-path.ts:1](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/object/to-path.ts#L1)

___

### objectTrace

▸ **objectTrace**<`TValue`\>(): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | extends `object` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getNodes` | () => `PropertyKey`[] |
| `resetNodes` | () => `void` |
| `value` | `TValue` |

#### Defined in

[packages/utilities/src/object/trace.ts:10](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/object/trace.ts#L10)

___

### typeGetType

▸ **typeGetType**(`input`): [`RuntimeType`](harlem_utilities.md#runtimetype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `unknown` |

#### Returns

[`RuntimeType`](harlem_utilities.md#runtimetype)

#### Defined in

[packages/utilities/src/type/get-type.ts:5](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/type/get-type.ts#L5)

___

### typeIsArray

▸ **typeIsArray**(`value`): value is unknown[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is unknown[]

#### Defined in

[packages/utilities/src/type/is-array.ts:3](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/type/is-array.ts#L3)

___

### typeIsFunction

▸ **typeIsFunction**(`value`): value is Function

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is Function

#### Defined in

[packages/utilities/src/type/is-function.ts:4](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/type/is-function.ts#L4)

___

### typeIsMatchable

▸ **typeIsMatchable**(`value`): value is Matchable

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is Matchable

#### Defined in

[packages/utilities/src/type/is-matchable.ts:7](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/type/is-matchable.ts#L7)

___

### typeIsNil

▸ **typeIsNil**(`value`): value is undefined \| null

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is undefined \| null

#### Defined in

[packages/utilities/src/type/is-nil.ts:2](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/type/is-nil.ts#L2)

___

### typeIsObject

▸ **typeIsObject**(`value`): value is object

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is object

#### Defined in

[packages/utilities/src/type/is-object.ts:3](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/type/is-object.ts#L3)

___

### typeIsString

▸ **typeIsString**(`value`): value is string

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is string

#### Defined in

[packages/utilities/src/type/is-string.ts:3](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/utilities/src/type/is-string.ts#L3)
