import { AgreementTransactionCategory } from './agreement-transaction-category'
import { Provider } from '@angular/core'

export enum TransactionState {
  Pending = 0,
  Done = 1,
}

export enum TranstactionType {
  Input = 0,
  Output = 1,
}

export class Transaction {
  public key: string
  public type: TranstactionType
  public state: TransactionState
  public amount: number
  public dateTime: Date
  public tituleOperation: String
  public description: String
  public category: AgreementTransactionCategory
  public provider: Provider

  constructor(dto) {
    this.key = dto.key
    this.dateTime = new Date()
    this.state = dto.estado
    this.provider = null
    this.category = null
    this.type = dto.tipo
    this.amount = dto.monto
    this.tituleOperation = dto.titulo
    this.description = dto.descripcion
  }
  public toDto() {
    let dto = {
      titulo: this.tituleOperation,
      monto: this.amount,
      tipo: this.type,
      estado: this.state,
      descripcion: this.description,
      fecha: this.dateTime,
    }

    if (this.key != null) {
      dto['key'] = this.key
    }

    return dto
  }
  getDateFormat(): string {
    return (
      this.dateTime.getDay() +
      '/' +
      this.dateTime.getMonth() +
      '/' +
      this.dateTime.getFullYear()
    )
  }
  getTimeFormat(): string {
    return this.dateTime.getHours() + ':' + this.dateTime.getMinutes() + ' hs'
  }
}
