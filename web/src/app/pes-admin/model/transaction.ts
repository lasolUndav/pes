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
  public key: string
  public shortDescription: string
  public description: string
  public type: TranstactionType
  public state: TransactionState
  public amount: number
  public dateTime: Date
  public category: AgreementTransactionCategory
  public provider: Provider

  constructor(dto) {
    if ('key' in dto) {
      this.key = dto.key
    } else {
      this.key = null
    }

    if ('fechaHora' in dto) {
      this.dateTime = new Date(dto.fechaHora)
    } else {
      this.dateTime = new Date()
    }

    if ('estado' in dto) {
      this.state = dto.estado
    } else {
      this.state = TransactionState.Pending
    }

    if ('keyProveedor' in dto) {
      this.provider = new Provider(dto.proveedores[dto.keyProveedor])
    } else {
      this.provider = null
    }

    if ('monto' in dto) {
      this.amount = dto.monto
    } else {
      this.amount = 0
    }

    if ('titulo' in dto) {
      this.shortDescription = dto.titulo
    } else {
      this.shortDescription = ''
    }

    if ('descripcion' in dto) {
      this.description = dto.descripcion
    } else {
      this.description = ''
    }

    this.type = dto.tipo
  }
  public toDto() {
    let dto = {
      titulo: this.shortDescription,
      descripcion: this.description,
      monto: this.amount,
      fechaHora: this.dateTime.valueOf(),
      tipo: this.type,
      estado: this.state,
    }

    if (this.key != null) {
      dto['key'] = this.key
    }

    if (this.provider != null) {
      dto['keyProveedor'] = this.provider.key
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
