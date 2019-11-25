import { AgreementTransactionCategory } from './agreement-transaction-category'
import { Provider } from './provider'
import { ServiceProvider } from '../service/provider.service'

export enum TransactionState {
  Pending = 0,
  Done = 1,
}

export enum TranstactionType {
  Input = 0,
  Output = 1,
}

export class Transaction {
  private serviceProvider: ServiceProvider
  public key: string
  public shortDescription: string
  public description: string
  public type: TranstactionType
  public state: TransactionState
  public amount: number
  public dateTime: Date
  public category: AgreementTransactionCategory
  public provider: Provider
  public keyProvider: string

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
      this.keyProvider = dto.keyProveedor
    } else {
      this.keyProvider = null
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
    } else if (this.keyProvider != null) {
      dto['keyProveedor'] = this.keyProvider
    }

    return dto
  }
}
