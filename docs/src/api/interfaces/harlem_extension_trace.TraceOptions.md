[Harlem - v1.0.0](../index.md) / [@harlem/extension-trace](../modules/harlem_extension_trace.md) / TraceOptions

# Interface: TraceOptions<TValue\>

[@harlem/extension-trace](../modules/harlem_extension_trace.md).TraceOptions

## Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | extends `object` |

## Table of contents

### Properties

- [gates](harlem_extension_trace.TraceOptions.md#gates)
- [hasGetGate](harlem_extension_trace.TraceOptions.md#hasgetgate)
- [paths](harlem_extension_trace.TraceOptions.md#paths)

## Properties

### gates

• **gates**: keyof `ProxyHandler`<`TValue`\>[]

#### Defined in

[extensions/trace/src/types.ts:9](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/trace/src/types.ts#L9)

___

### hasGetGate

• **hasGetGate**: `boolean`

#### Defined in

[extensions/trace/src/types.ts:11](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/trace/src/types.ts#L11)

___

### paths

• **paths**: `PropertyKey`[]

#### Defined in

[extensions/trace/src/types.ts:10](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/trace/src/types.ts#L10)
