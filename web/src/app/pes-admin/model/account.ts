import { Transaction, TransactionState, TranstactionType } from './transaction'

export class Account {
  public key: string
  public transactions: Array<Transaction>
  public name: string
  public dataTransactions = []

  constructor(result) {
    this.key = result.key
    this.name = result.nombreConvenio
    this.transactions = result.transacciones
  }

  public toDto() {
    let dto = {
      nombre: this.name,
    }

    if (this.key != null) {
      dto['key'] = this.key
    }

    return dto
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
    Object.entries(this.transactions).forEach(([keyTransaction, transaction]) => {
      this.dataTransactions.push(transaction)
      console.log(transaction.dateTime)
    })
    console.log(this.dataTransactions)

    return this.dataTransactions
  }
}
