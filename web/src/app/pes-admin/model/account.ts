import { Transaction, TransactionState, TranstactionType } from './transaction'

import { noUndefined } from '@angular/compiler/src/util'

export class Account {
  public key: string
  public transactions: Array<Transaction>
  public name: string
  public dataTransactions: String

  constructor(result) {
    this.name = result.nombreConvenio
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
    this.dataTransactions = ''
    let data = ''
    Object.entries(this.transactions).forEach(([keyTransaction, transaction]) => {
      data += keyTransaction + ','
      for (const [key, value] of Object.entries(transaction)) {
        data += key + ' : ' + value + ','
      }
      this.dataTransactions = data.slice(0, -1)
    })

    return this.dataTransactions
  }
}
