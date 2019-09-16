import { AgreementTransactionCategory } from './agreement-transaction-category'
import { DatePeriod } from './date-period'

export class Agreement {
  public key: string
  public nombre: string
  public periodo: string
  public cuenta: number
  public categorias: Array<AgreementTransactionCategory>

  constructor(result) {
    this.nombre = result.nombre
    this.categorias = new Array<AgreementTransactionCategory>()
    this.periodo = result.periodo
    this.cuenta = result.monto
  }
}
