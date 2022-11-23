[Harlem - v1.0.0](../index.md) / @harlem/extension-transaction

# Module: @harlem/extension-transaction

## Table of contents

### Interfaces

- [TransactionEventData](../interfaces/harlem_extension_transaction.TransactionEventData.md)

### Type Aliases

- [Transaction](harlem_extension_transaction.md#transaction)
- [TransactionHookHandler](harlem_extension_transaction.md#transactionhookhandler)
- [Transactor](harlem_extension_transaction.md#transactor)

### Functions

- [default](harlem_extension_transaction.md#default)

## Type Aliases

### Transaction

Ƭ **Transaction**<`TPayload`\>: `undefined` extends `TPayload` ? (`payload?`: `TPayload`) => `void` : (`payload`: `TPayload`) => `void`

#### Type parameters

| Name |
| :------ |
| `TPayload` |

#### Defined in

[extensions/transaction/src/types.ts:7](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/transaction/src/types.ts#L7)

___

### TransactionHookHandler

Ƭ **TransactionHookHandler**<`TPayload`\>: (`data`: [`TransactionEventData`](../interfaces/harlem_extension_transaction.TransactionEventData.md)<`TPayload`\>) => `void`

#### Type parameters

| Name |
| :------ |
| `TPayload` |

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`TransactionEventData`](../interfaces/harlem_extension_transaction.TransactionEventData.md)<`TPayload`\> |

##### Returns

`void`

#### Defined in

[extensions/transaction/src/types.ts:8](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/transaction/src/types.ts#L8)

___

### Transactor

Ƭ **Transactor**<`TState`, `TPayload`\>: (`payload`: `TPayload`, `mutator`: (`mutate`: `Mutator`<`TState`, `undefined`, `void`\>) => `void`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TState` | extends `BaseState` |
| `TPayload` | `undefined` |

#### Type declaration

▸ (`payload`, `mutator`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `TPayload` |
| `mutator` | (`mutate`: `Mutator`<`TState`, `undefined`, `void`\>) => `void` |

##### Returns

`void`

#### Defined in

[extensions/transaction/src/types.ts:6](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/transaction/src/types.ts#L6)

## Functions

### default

▸ **default**<`TState`\>(): (`store`: `InternalStore`<`TState`\>) => { `onAfterTransaction`: <TPayload\>(`actionName`: `string` \| `string`[], `handler`: [`TransactionHookHandler`](harlem_extension_transaction.md#transactionhookhandler)<`TPayload`\>) => `Disposable` ; `onBeforeTransaction`: <TPayload\>(`actionName`: `string` \| `string`[], `handler`: [`TransactionHookHandler`](harlem_extension_transaction.md#transactionhookhandler)<`TPayload`\>) => `Disposable` ; `onTransactionError`: <TPayload\>(`actionName`: `string` \| `string`[], `handler`: [`TransactionHookHandler`](harlem_extension_transaction.md#transactionhookhandler)<`TPayload`\>) => `Disposable` ; `onTransactionSuccess`: <TPayload\>(`actionName`: `string` \| `string`[], `handler`: [`TransactionHookHandler`](harlem_extension_transaction.md#transactionhookhandler)<`TPayload`\>) => `Disposable` ; `transaction`: <TPayload\>(`name`: `string`, `transactor`: [`Transactor`](harlem_extension_transaction.md#transactor)<`TState`, `TPayload`\>) => [`Transaction`](harlem_extension_transaction.md#transaction)<`TPayload`\>  }

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
| `onAfterTransaction` | <TPayload\>(`actionName`: `string` \| `string`[], `handler`: [`TransactionHookHandler`](harlem_extension_transaction.md#transactionhookhandler)<`TPayload`\>) => `Disposable` |
| `onBeforeTransaction` | <TPayload\>(`actionName`: `string` \| `string`[], `handler`: [`TransactionHookHandler`](harlem_extension_transaction.md#transactionhookhandler)<`TPayload`\>) => `Disposable` |
| `onTransactionError` | <TPayload\>(`actionName`: `string` \| `string`[], `handler`: [`TransactionHookHandler`](harlem_extension_transaction.md#transactionhookhandler)<`TPayload`\>) => `Disposable` |
| `onTransactionSuccess` | <TPayload\>(`actionName`: `string` \| `string`[], `handler`: [`TransactionHookHandler`](harlem_extension_transaction.md#transactionhookhandler)<`TPayload`\>) => `Disposable` |
| `transaction` | <TPayload\>(`name`: `string`, `transactor`: [`Transactor`](harlem_extension_transaction.md#transactor)<`TState`, `TPayload`\>) => [`Transaction`](harlem_extension_transaction.md#transaction)<`TPayload`\> |

#### Defined in

[extensions/transaction/src/index.ts:22](https://github.com/andrewcourtice/harlem/blob/1dcd57c/extensions/transaction/src/index.ts#L22)
