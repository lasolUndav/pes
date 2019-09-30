import { AgreementTransactionCategory } from './agreement-transaction-category'
import { DatePeriod } from './date-period'

export class Agreement {
  public key: string
  public nombre: string
  public periodo: string
  public monto: number
  public keyCuenta: string
  public categorias: Array<AgreementTransactionCategory>

  constructor(result) {
    this.key = result.key
    this.nombre = result.nombre
    this.categorias = new Array<AgreementTransactionCategory>()
    this.periodo = result.periodo
    this.monto = result.monto
    this.keyCuenta = result.keyCuenta
  }
}
