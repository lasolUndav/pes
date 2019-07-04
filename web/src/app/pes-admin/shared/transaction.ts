import { Provider } from './provider'

enum TransactionState { Pending= 0, Done= 1 }
enum TranstactionType { Input= 0, Output= 1 }

export class Transaction {
  type: TranstactionType
  state: TransactionState
  dateTime: Date
  amount: number
  category: string
  provider: Provider

  constructor(amount: number, type: TranstactionType, state: TransactionState) {
    this .dateTime = new Date()
    this .state = state
    this .provider = null
    this .category = null
    this .type = type
    this .amount = amount
  }

  static createInputTransaction(amount: number,
    state: TransactionState = TransactionState.Done): Transaction {
    return new Transaction(amount, TranstactionType.Input, state)
  }

  static createOutputTransaction(amount: number, provider: Provider,
    category: string, state: TransactionState = TransactionState.Done)
  : Transaction {
    const transaction = new Transaction(amount, TranstactionType.Output, state)
    transaction.provider = provider
    transaction.category = category
    return transaction
  }
}
