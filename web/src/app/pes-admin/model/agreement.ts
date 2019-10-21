import { AgreementTransactionCategory } from './agreement-transaction-category'

export class Agreement {
  public key: string
  public nombre: string
  public periodoInicio: Date
  public periodoFin: Date
  public monto: number
  public keyCuenta: string
  public categorias: Array<AgreementTransactionCategory>

  constructor(result) {
    this.key = result.key
    this.nombre = result.nombre
    this.categorias = new Array<AgreementTransactionCategory>()
    this.periodoInicio = result.periodoInicio
    this.periodoFin = result.periodoFin
    this.monto = result.monto
    this.keyCuenta = result.keyCuenta
  }
}
