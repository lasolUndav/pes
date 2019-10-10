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

  constructor(result) {
    this.dateTime = new Date()
    this.state = result.estado
    this.provider = null
    this.category = null
    this.type = result.tipo
    this.amount = result.monto
    this.description = result.descripcion
  }
  getType() {
    return this.type
  }
  getState() {
    return this.state
  }
  getAmount() {
    return this.amount
  }
}
