[Harlem - v1.0.0](../index.md) / @harlem/extension-trace

# Module: @harlem/extension-trace

## Table of contents

### Interfaces

- [Options](../interfaces/harlem_extension_trace.Options.md)
- [TraceListener](../interfaces/harlem_extension_trace.TraceListener.md)
- [TraceOptions](../interfaces/harlem_extension_trace.TraceOptions.md)
- [TraceResult](../interfaces/harlem_extension_trace.TraceResult.md)

### Type Aliases

- [GateMap](harlem_extension_trace.md#gatemap)
- [TraceCallback](harlem_extension_trace.md#tracecallback)
- [TraceGate](harlem_extension_trace.md#tracegate)

### Functions

- [default](harlem_extension_trace.md#default)

## Type Aliases

### GateMap

Ƭ **GateMap**<`TValue`\>: { [TGate in TraceGate<TValue\>]?: Function }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | extends `object` = `any` |

#### Defined in

[extensions/trace/src/types.ts:4](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/trace/src/types.ts#L4)

___

### TraceCallback

Ƭ **TraceCallback**<`TValue`\>: (`result`: [`TraceResult`](../interfaces/harlem_extension_trace.TraceResult.md)<`TValue`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | extends `object` |

#### Type declaration

▸ (`result`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`TraceResult`](../interfaces/harlem_extension_trace.TraceResult.md)<`TValue`\> |

##### Returns

`void`

#### Defined in

[extensions/trace/src/types.ts:2](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/trace/src/types.ts#L2)

___

### TraceGate

Ƭ **TraceGate**<`TValue`\>: keyof `ProxyHandler`<`TValue`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | extends `object` |

#### Defined in

[extensions/trace/src/types.ts:1](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/trace/src/types.ts#L1)

## Functions

### default

▸ **default**<`TState`\>(`options?`): (`store`: `InternalStore`<`TState`\>) => { `onTraceResult`: (`callback`: [`TraceCallback`](harlem_extension_trace.md#tracecallback)<`TState`\>) => [`TraceListener`](../interfaces/harlem_extension_trace.TraceListener.md) ; `startTrace`: (`gates`: keyof `ProxyHandler`<`TValue`\> \| keyof `ProxyHandler`<`TValue`\>[]) => `void` ; `stopTrace`: () => `void`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends `BaseState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<[`Options`](../interfaces/harlem_extension_trace.Options.md)\> |

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
| `onTraceResult` | (`callback`: [`TraceCallback`](harlem_extension_trace.md#tracecallback)<`TState`\>) => [`TraceListener`](../interfaces/harlem_extension_trace.TraceListener.md) |
| `startTrace` | (`gates`: keyof `ProxyHandler`<`TValue`\> \| keyof `ProxyHandler`<`TValue`\>[]) => `void` |
| `stopTrace` | () => `void` |

#### Defined in

[extensions/trace/src/index.ts:142](https://github.com/andrewcourtice/harlem/blob/ca8d117/extensions/trace/src/index.ts#L142)
