import { AgreementTransactionCategory } from './agreement-transaction-category'
import { DatePeriod } from './date-period'

export class Agreement {
  public key: string
  public name: string
  public period: DatePeriod
  public amount: number
  public categories: Array<AgreementTransactionCategory>

  constructor(name: string, amount: number = 0) {
    this.name = name
    this.categories = new Array<AgreementTransactionCategory>()
    this.period = null
    this.amount = amount
  }
}
