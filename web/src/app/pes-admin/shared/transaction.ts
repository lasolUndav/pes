import { AgreementTransactionCategory } from './agreement-transaction-category'
import { Provider } from './provider'

export enum TransactionState {
  Pending = 0,
  Done = 1,
}

export enum TranstactionType {
  Input = 0,
  Output = 1,
}

export class Transaction {
  public type: TranstactionType
  public state: TransactionState
  public dateTime: Date
  public amount: number
  public category: AgreementTransactionCategory
  public provider: Provider

  constructor(amount: number, type: TranstactionType, state: TransactionState) {
    this.dateTime = new Date()
    this.state = state
    this.provider = null
    this.category = null
    this.type = type
    this.amount = amount
  }

  static createInputTransaction(
    amount: number,
    state: TransactionState = TransactionState.Done
  ): Transaction {
    return new Transaction(amount, TranstactionType.Input, state)
  }

  static createOutputTransaction(
    amount: number,
    provider: Provider,
    category: AgreementTransactionCategory,
    state: TransactionState = TransactionState.Done
  ): Transaction {
    const transaction = new Transaction(amount, TranstactionType.Output, state)
    transaction.provider = provider
    transaction.category = category
    return transaction
  }
}
