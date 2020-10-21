**[Harlem](../README.md)**

> [Globals](../README.md) / @harlem/utilities

# Module: @harlem/utilities

## Index

### References

* [clone](_harlem_utilities.md#clone)
* [overwrite](_harlem_utilities.md#overwrite)

### Variables

* [CLONE\_MAP](_harlem_utilities.md#clone_map)

### Functions

* [clone](_harlem_utilities.md#clone)
* [cloneArray](_harlem_utilities.md#clonearray)
* [cloneBasic](_harlem_utilities.md#clonebasic)
* [cloneIdentity](_harlem_utilities.md#cloneidentity)
* [cloneMap](_harlem_utilities.md#clonemap)
* [cloneObject](_harlem_utilities.md#cloneobject)
* [cloneSet](_harlem_utilities.md#cloneset)
* [cloneSymbol](_harlem_utilities.md#clonesymbol)
* [default](_harlem_utilities.md#default)
* [getComplexTypes](_harlem_utilities.md#getcomplextypes)
* [getSimpleTypes](_harlem_utilities.md#getsimpletypes)
* [getType](_harlem_utilities.md#gettype)

## References

### clone

Re-exports: [clone](_harlem_utilities.md#clone)

___

### overwrite

Renames and exports: [default](_harlem_utilities.md#default)

## Variables

### CLONE\_MAP

• `Const` **CLONE\_MAP**: Record\<string, (value: any) => any> = { default: () => null, boolean: cloneBasic, number: cloneBasic, string: cloneBasic, error: cloneBasic, date: cloneBasic, regexp: cloneBasic, function: cloneIdentity, symbol: cloneSymbol, array: cloneArray, object: cloneObject, map: cloneMap, set: cloneSet} as Record\<string, ((value: any) => any)>

*Defined in [packages/utilities/src/clone.ts:51](https://github.com/andrewcourtice/harlem/blob/97733b5/packages/utilities/src/clone.ts#L51)*

## Functions

### clone

▸ **clone**(`value`: any): any

*Defined in [packages/utilities/src/clone.ts:67](https://github.com/andrewcourtice/harlem/blob/97733b5/packages/utilities/src/clone.ts#L67)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |

**Returns:** any

___

### cloneArray

▸ **cloneArray**(`input`: any[]): any[]

*Defined in [packages/utilities/src/clone.ts:27](https://github.com/andrewcourtice/harlem/blob/97733b5/packages/utilities/src/clone.ts#L27)*

#### Parameters:

Name | Type |
------ | ------ |
`input` | any[] |

**Returns:** any[]

___

### cloneBasic

▸ **cloneBasic**(`input`: any): any

*Defined in [packages/utilities/src/clone.ts:9](https://github.com/andrewcourtice/harlem/blob/97733b5/packages/utilities/src/clone.ts#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`input` | any |

**Returns:** any

___

### cloneIdentity

▸ **cloneIdentity**(`input`: any): any

*Defined in [packages/utilities/src/clone.ts:5](https://github.com/andrewcourtice/harlem/blob/97733b5/packages/utilities/src/clone.ts#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`input` | any |

**Returns:** any

___

### cloneMap

▸ **cloneMap**(`input`: Map\<any, any>): Map\<any, any>

*Defined in [packages/utilities/src/clone.ts:41](https://github.com/andrewcourtice/harlem/blob/97733b5/packages/utilities/src/clone.ts#L41)*

#### Parameters:

Name | Type |
------ | ------ |
`input` | Map\<any, any> |

**Returns:** Map\<any, any>

___

### cloneObject

▸ **cloneObject**(`input`: Record\<PropertyKey, any>): Record\<PropertyKey, any>

*Defined in [packages/utilities/src/clone.ts:17](https://github.com/andrewcourtice/harlem/blob/97733b5/packages/utilities/src/clone.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`input` | Record\<PropertyKey, any> |

**Returns:** Record\<PropertyKey, any>

___

### cloneSet

▸ **cloneSet**(`input`: Set\<any>): Set\<any>

*Defined in [packages/utilities/src/clone.ts:31](https://github.com/andrewcourtice/harlem/blob/97733b5/packages/utilities/src/clone.ts#L31)*

#### Parameters:

Name | Type |
------ | ------ |
`input` | Set\<any> |

**Returns:** Set\<any>

___

### cloneSymbol

▸ **cloneSymbol**(`input`: Symbol): Symbol

*Defined in [packages/utilities/src/clone.ts:13](https://github.com/andrewcourtice/harlem/blob/97733b5/packages/utilities/src/clone.ts#L13)*

#### Parameters:

Name | Type |
------ | ------ |
`input` | Symbol |

**Returns:** Symbol

___

### default

▸ **default**\<T>(`source`: T, `value`: any): any

*Defined in [packages/utilities/src/overwrite.ts:1](https://github.com/andrewcourtice/harlem/blob/97733b5/packages/utilities/src/overwrite.ts#L1)*

#### Type parameters:

Name | Type |
------ | ------ |
`T` | object |

#### Parameters:

Name | Type |
------ | ------ |
`source` | T |
`value` | any |

**Returns:** any

___

### getComplexTypes

▸ **getComplexTypes**(): Record\<string, any>

*Defined in [packages/utilities/test/clone.test.ts:14](https://github.com/andrewcourtice/harlem/blob/97733b5/packages/utilities/test/clone.test.ts#L14)*

**Returns:** Record\<string, any>

___

### getSimpleTypes

▸ **getSimpleTypes**(): Record\<string, any>

*Defined in [packages/utilities/test/clone.test.ts:3](https://github.com/andrewcourtice/harlem/blob/97733b5/packages/utilities/test/clone.test.ts#L3)*

**Returns:** Record\<string, any>

___

### getType

▸ **getType**(`input`: any): string

*Defined in [packages/utilities/src/clone.ts:1](https://github.com/andrewcourtice/harlem/blob/97733b5/packages/utilities/src/clone.ts#L1)*

#### Parameters:

Name | Type |
------ | ------ |
`input` | any |

**Returns:** string
