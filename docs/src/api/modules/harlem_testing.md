[Harlem - v1.0.0](../index.md) / @harlem/testing

# Module: @harlem/testing

## Table of contents

### Functions

- [bootstrap](harlem_testing.md#bootstrap)
- [getStore](harlem_testing.md#getstore)
- [jsonClone](harlem_testing.md#jsonclone)
- [sleep](harlem_testing.md#sleep)

## Functions

### bootstrap

▸ **bootstrap**(`plugins?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `plugins?` | `HarlemPlugin`[] |

#### Returns

`void`

#### Defined in

[packages/testing/src/index.ts:23](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/testing/src/index.ts#L23)

___

### getStore

▸ **getStore**<`TExtensions`\>(`options?`): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TExtensions` | extends `Extension`<{ `details`: { `age`: `number` = 0; `firstName`: `string` = ''; `lastName`: `string` = '' } ; `id`: `number` = 0 }\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<`StoreOptions`<{ `details`: { `age`: `number` = 0; `firstName`: `string` = ''; `lastName`: `string` = '' } ; `id`: `number` = 0 }, `TExtensions`\>\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `fullName` | `any` |
| `name` | `string` |
| `reset` | `any` |
| `setUserDetails` | `any` |
| `setUserID` | `any` |
| `store` | `PublicStore`<{ `details`: { `age`: `number` = 0; `firstName`: `string` = ''; `lastName`: `string` = '' } ; `id`: `number` = 0 }, `TExtensions`\> |

#### Defined in

[packages/testing/src/store.ts:32](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/testing/src/store.ts#L32)

___

### jsonClone

▸ **jsonClone**<`TValue`\>(`value`): `TValue`

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

[packages/testing/src/store.ts:28](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/testing/src/store.ts#L28)

___

### sleep

▸ **sleep**(`timeout?`): `Promise`<`unknown`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `timeout` | `number` | `0` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[packages/testing/src/index.ts:29](https://github.com/andrewcourtice/harlem/blob/1dcd57c/packages/testing/src/index.ts#L29)
