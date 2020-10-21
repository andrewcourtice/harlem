**[Harlem](../README.md)**

> [Globals](../README.md) / @harlem/plugin-transaction

# Module: @harlem/plugin-transaction

## Index

### References

* [Transaction](_harlem_plugin_transaction.md#transaction)
* [TransactionEventData](_harlem_plugin_transaction.md#transactioneventdata)
* [TransactionRollback](_harlem_plugin_transaction.md#transactionrollback)
* [Transactor](_harlem_plugin_transaction.md#transactor)

### Interfaces

* [TransactionEventData](../interfaces/_harlem_plugin_transaction.transactioneventdata.md)

### Type aliases

* [Transaction](_harlem_plugin_transaction.md#transaction)
* [TransactionRollback](_harlem_plugin_transaction.md#transactionrollback)
* [Transactor](_harlem_plugin_transaction.md#transactor)

### Variables

* [SENDER](_harlem_plugin_transaction.md#sender)
* [eventEmitter](_harlem_plugin_transaction.md#eventemitter)
* [stores](_harlem_plugin_transaction.md#stores)

### Functions

* [default](_harlem_plugin_transaction.md#default)
* [transaction](_harlem_plugin_transaction.md#transaction)

### Object literals

* [EVENTS](_harlem_plugin_transaction.md#events)

## References

### Transaction

Re-exports: [Transaction](_harlem_plugin_transaction.md#transaction)

___

### TransactionEventData

Re-exports: [TransactionEventData](../interfaces/_harlem_plugin_transaction.transactioneventdata.md)

___

### TransactionRollback

Re-exports: [TransactionRollback](_harlem_plugin_transaction.md#transactionrollback)

___

### Transactor

Re-exports: [Transactor](_harlem_plugin_transaction.md#transactor)

## Type aliases

### Transaction

Ƭ  **Transaction**\<T>: (payload?: T) => void

*Defined in [plugins/transaction/src/types.ts:2](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/transaction/src/types.ts#L2)*

#### Type parameters:

Name |
------ |
`T` |

___

### TransactionRollback

Ƭ  **TransactionRollback**: () => void

*Defined in [plugins/transaction/src/types.ts:3](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/transaction/src/types.ts#L3)*

___

### Transactor

Ƭ  **Transactor**\<T>: (payload?: T) => void

*Defined in [plugins/transaction/src/types.ts:1](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/transaction/src/types.ts#L1)*

#### Type parameters:

Name |
------ |
`T` |

## Variables

### SENDER

• `Const` **SENDER**: \"transaction\" = "transaction"

*Defined in [plugins/transaction/src/constants.ts:1](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/transaction/src/constants.ts#L1)*

___

### eventEmitter

• `Let` **eventEmitter**: Emittable

*Defined in [plugins/transaction/src/index.ts:27](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/transaction/src/index.ts#L27)*

___

### stores

• `Let` **stores**: [InternalStores](_harlem_core.md#internalstores)

*Defined in [plugins/transaction/src/index.ts:28](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/transaction/src/index.ts#L28)*

## Functions

### default

▸ **default**(): HarlemPlugin

*Defined in [plugins/transaction/src/index.ts:78](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/transaction/src/index.ts#L78)*

**Returns:** HarlemPlugin

___

### transaction

▸ **transaction**\<T>(`name`: string, `transactor`: [Transactor](_harlem_plugin_transaction.md#transactor)\<T>): [Transaction](_harlem_plugin_transaction.md#transaction)\<T>

*Defined in [plugins/transaction/src/index.ts:30](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/transaction/src/index.ts#L30)*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`transactor` | [Transactor](_harlem_plugin_transaction.md#transactor)\<T> |

**Returns:** [Transaction](_harlem_plugin_transaction.md#transaction)\<T>

## Object literals

### EVENTS

▪ `Const` **EVENTS**: object

*Defined in [plugins/transaction/src/constants.ts:3](https://github.com/andrewcourtice/harlem/blob/97733b5/plugins/transaction/src/constants.ts#L3)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`transaction` | object | { after: string = "transaction:after"; before: string = "transaction:before"; error: string = "transaction:error" } |
