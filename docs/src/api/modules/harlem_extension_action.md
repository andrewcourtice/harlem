[Harlem - v1.0.0](../index.md) / @harlem/extension-action

# Module: @harlem/extension-action

## Table of contents

### Classes

- [ActionAbortError](../classes/harlem_extension_action.ActionAbortError.md)

### Interfaces

- [ActionAbortStrategies](../interfaces/harlem_extension_action.ActionAbortStrategies.md)
- [ActionOptions](../interfaces/harlem_extension_action.ActionOptions.md)
- [ActionState](../interfaces/harlem_extension_action.ActionState.md)
- [ActionStrategies](../interfaces/harlem_extension_action.ActionStrategies.md)
- [Options](../interfaces/harlem_extension_action.Options.md)

### Type Aliases

- [Action](harlem_extension_action.md#action)
- [ActionAbortStrategy](harlem_extension_action.md#actionabortstrategy)
- [ActionBody](harlem_extension_action.md#actionbody)
- [ActionPredicate](harlem_extension_action.md#actionpredicate)

### Variables

- [ABORT\_STRATEGY](harlem_extension_action.md#abort_strategy)

### Functions

- [default](harlem_extension_action.md#default)

## Type Aliases

### Action

Ƭ **Action**<`TPayload`, `TResult`\>: `undefined` extends `TPayload` ? (`payload?`: `TPayload`, `controller?`: `AbortController`) => `Task`<`TResult`\> : (`payload`: `TPayload`, `controller?`: `AbortController`) => `Task`<`TResult`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TPayload` | `TPayload` |
| `TResult` | `void` |

#### Defined in

[extensions/action/src/types.ts:11](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/action/src/types.ts#L11)

___

### ActionAbortStrategy

Ƭ **ActionAbortStrategy**: (`name`: `string`, `id`: `symbol`, `resolve`: (`value?`: `any`) => `void`, `reject`: (`reason?`: `unknown`) => `void`, `reason?`: `unknown`) => `void`

#### Type declaration

▸ (`name`, `id`, `resolve`, `reject`, `reason?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `id` | `symbol` |
| `resolve` | (`value?`: `any`) => `void` |
| `reject` | (`reason?`: `unknown`) => `void` |
| `reason?` | `unknown` |

##### Returns

`void`

#### Defined in

[extensions/action/src/types.ts:13](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/action/src/types.ts#L13)

___

### ActionBody

Ƭ **ActionBody**<`TState`, `TPayload`, `TResult`\>: (`payload`: `TPayload`, `mutator`: (`mutate`: `Mutator`<`TState`, `undefined`, `void`\>) => `void`, `controller`: `AbortController`, `onAbort`: (`callback`: `TaskAbortCallback`) => `void`) => `Promise`<`TResult`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends `BaseState` |
| `TPayload` | `undefined` |
| `TResult` | `void` |

#### Type declaration

▸ (`payload`, `mutator`, `controller`, `onAbort`): `Promise`<`TResult`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `TPayload` |
| `mutator` | (`mutate`: `Mutator`<`TState`, `undefined`, `void`\>) => `void` |
| `controller` | `AbortController` |
| `onAbort` | (`callback`: `TaskAbortCallback`) => `void` |

##### Returns

`Promise`<`TResult`\>

#### Defined in

[extensions/action/src/types.ts:10](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/action/src/types.ts#L10)

___

### ActionPredicate

Ƭ **ActionPredicate**<`TPayload`\>: (`payload?`: `TPayload`) => `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TPayload` | `unknown` |

#### Type declaration

▸ (`payload?`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `payload?` | `TPayload` |

##### Returns

`boolean`

#### Defined in

[extensions/action/src/types.ts:12](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/action/src/types.ts#L12)

## Variables

### ABORT\_STRATEGY

• `Const` **ABORT\_STRATEGY**: [`ActionAbortStrategies`](../interfaces/harlem_extension_action.ActionAbortStrategies.md)

#### Defined in

[extensions/action/src/index.ts:46](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/action/src/index.ts#L46)

## Functions

### default

▸ **default**<`TState`\>(`options?`): (`store`: `InternalStore`<`TState`\>) => { `abortAction`: (`name`: `string` \| `string`[], `reason?`: `unknown`) => `void` ; `action`: <TPayload, TResult\>(`name`: `string`, `body`: [`ActionBody`](harlem_extension_action.md#actionbody)<`TState`, `TPayload`, `TResult`\>, `options?`: `Partial`<[`ActionOptions`](../interfaces/harlem_extension_action.ActionOptions.md)<`TPayload`\>\>) => [`Action`](harlem_extension_action.md#action)<`TPayload`, `TResult`\> ; `getActionErrors`: (`name`: `string`) => { `error`: `unknown` ; `id`: `symbol`  }[] ; `hasActionFailed`: (`name`: `string`) => `boolean` ; `hasActionRun`: (`name`: `string`) => `boolean` ; `isActionAbortError`: (`value`: `unknown`) => value is ActionAbortError ; `isActionFirstRun`: (`name`: `string`) => `boolean` ; `isActionRunning`: <TPayload\>(`name`: `string`, `predicate?`: [`ActionPredicate`](harlem_extension_action.md#actionpredicate)<`TPayload`\>) => `boolean` ; `resetActionState`: (`name?`: `string` \| `string`[]) => `void` ; `suppressAbortError`: <TPayload, TResult\>(`action`: [`Action`](harlem_extension_action.md#action)<`TPayload`, `TResult`\>) => [`Action`](harlem_extension_action.md#action)<`TPayload`, `undefined` \| `TResult`\> ; `whenActionIdle`: <TPayload\>(`name`: `string`, `predicate?`: [`ActionPredicate`](harlem_extension_action.md#actionpredicate)<`TPayload`\>, `controller?`: `AbortController`) => `Task`<`void`\>  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends `BaseState` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<[`Options`](../interfaces/harlem_extension_action.Options.md)\> |

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
| `abortAction` | (`name`: `string` \| `string`[], `reason?`: `unknown`) => `void` |
| `action` | <TPayload, TResult\>(`name`: `string`, `body`: [`ActionBody`](harlem_extension_action.md#actionbody)<`TState`, `TPayload`, `TResult`\>, `options?`: `Partial`<[`ActionOptions`](../interfaces/harlem_extension_action.ActionOptions.md)<`TPayload`\>\>) => [`Action`](harlem_extension_action.md#action)<`TPayload`, `TResult`\> |
| `getActionErrors` | (`name`: `string`) => { `error`: `unknown` ; `id`: `symbol`  }[] |
| `hasActionFailed` | (`name`: `string`) => `boolean` |
| `hasActionRun` | (`name`: `string`) => `boolean` |
| `isActionAbortError` | (`value`: `unknown`) => value is ActionAbortError |
| `isActionFirstRun` | (`name`: `string`) => `boolean` |
| `isActionRunning` | <TPayload\>(`name`: `string`, `predicate?`: [`ActionPredicate`](harlem_extension_action.md#actionpredicate)<`TPayload`\>) => `boolean` |
| `resetActionState` | (`name?`: `string` \| `string`[]) => `void` |
| `suppressAbortError` | <TPayload, TResult\>(`action`: [`Action`](harlem_extension_action.md#action)<`TPayload`, `TResult`\>) => [`Action`](harlem_extension_action.md#action)<`TPayload`, `undefined` \| `TResult`\> |
| `whenActionIdle` | <TPayload\>(`name`: `string`, `predicate?`: [`ActionPredicate`](harlem_extension_action.md#actionpredicate)<`TPayload`\>, `controller?`: `AbortController`) => `Task`<`void`\> |

#### Defined in

[extensions/action/src/index.ts:68](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/action/src/index.ts#L68)
