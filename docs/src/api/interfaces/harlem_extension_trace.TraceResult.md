[Harlem - v1.0.0](../index.md) / [@harlem/extension-trace](../modules/harlem_extension_trace.md) / TraceResult

# Interface: TraceResult<TValue\>

[@harlem/extension-trace](../modules/harlem_extension_trace.md).TraceResult

## Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | extends `object` |

## Table of contents

### Properties

- [gate](harlem_extension_trace.TraceResult.md#gate)
- [newValue](harlem_extension_trace.TraceResult.md#newvalue)
- [nodes](harlem_extension_trace.TraceResult.md#nodes)
- [oldValue](harlem_extension_trace.TraceResult.md#oldvalue)
- [path](harlem_extension_trace.TraceResult.md#path)
- [prop](harlem_extension_trace.TraceResult.md#prop)

## Properties

### gate

• **gate**: keyof `ProxyHandler`<`TValue`\>

#### Defined in

[extensions/trace/src/types.ts:16](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/trace/src/types.ts#L16)

___

### newValue

• **newValue**: `unknown`

#### Defined in

[extensions/trace/src/types.ts:20](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/trace/src/types.ts#L20)

___

### nodes

• **nodes**: `PropertyKey`[]

#### Defined in

[extensions/trace/src/types.ts:17](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/trace/src/types.ts#L17)

___

### oldValue

• **oldValue**: `unknown`

#### Defined in

[extensions/trace/src/types.ts:19](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/trace/src/types.ts#L19)

___

### path

• `Readonly` **path**: `string`

#### Defined in

[extensions/trace/src/types.ts:15](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/trace/src/types.ts#L15)

___

### prop

• **prop**: `PropertyKey`

#### Defined in

[extensions/trace/src/types.ts:18](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/trace/src/types.ts#L18)
