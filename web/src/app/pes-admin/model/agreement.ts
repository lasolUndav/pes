import { AgreementTransactionCategory } from './agreement-transaction-category'
import { DatePeriod } from './date-period'

export class Agreement {
  public key: string
  public name: string
  public period: string
  public amount: number
  public categories: Array<AgreementTransactionCategory>

  constructor(result) {
    this.name = result.nombre
    this.categories = new Array<AgreementTransactionCategory>()
    this.period = result.periodo
    this.amount = result.monto
  }
}
