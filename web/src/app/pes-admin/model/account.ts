import { Transaction, TransactionState, TranstactionType } from './transaction'

import { Agreement } from './agreement'
import { transition } from '@angular/animations'

export class Account {
  public key: string
  public nameAgreement: string
  public nameAccount: string
  public transactions: Array<Transaction>

  constructor(result) {
    this.nameAccount = result.nombreCuenta
    this.nameAgreement = result.nombreConvenio
    this.transactions = result.transacciones
  }

  private getTotalOutputAmount(state: TransactionState) {
    const total = this.transactions
      .filter(trx => trx.state === state && trx.type === TranstactionType.Output)
      .reduce((sum, trx) => sum + trx.amount, 0)
    return total
  }

  getTotalInputAmount() {
    const total = this.transactions
      .filter(trx => trx.type === TranstactionType.Input)
      .reduce((sum, trx) => sum + trx.amount, 0)
    return total
  }

  getTotalAmountConfirmed() {
    const totalInput = this.getTotalInputAmount()
    const totalOuput = this.getTotalOutputAmount(TransactionState.Done)
    return totalInput - totalOuput
  }

  getTotalAmountPending() {
    const totalOuputPending = this.getTotalOutputAmount(TransactionState.Pending)
    return totalOuputPending
  }
  getTransactionData() {
    this.transactions.forEach(transaction => {
      console.log(transition)
    })
  }
}
