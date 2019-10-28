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
  public amount: number
  public dateTime: Date
  public description: String
  public category: AgreementTransactionCategory
  public provider: Provider

  constructor(
    amount: number,
    type: TranstactionType,
    description: String,
    state: TransactionState
  ) {
    this.dateTime = new Date()
    this.state = state
    this.provider = null
    this.category = null
    this.type = type
    this.amount = amount
    this.description = description
  }

  static createInputTransaction(
    amount: number,
    description: String,
    state: TransactionState = TransactionState.Done
  ): Transaction {
    return new Transaction(amount, TranstactionType.Input, description, state)
  }

  static createOutputTransaction(
    amount: number,
    provider: Provider,
    category: AgreementTransactionCategory,
    description: String,
    state: TransactionState = TransactionState.Done
  ): Transaction {
    const transaction = new Transaction(
      amount,
      TranstactionType.Output,
      description,
      state
    )
    transaction.provider = provider
    transaction.category = category
    return transaction
  }
}
