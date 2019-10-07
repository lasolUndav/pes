import { Transaction, TransactionState, TranstactionType } from './transaction'

export class Account {
  public key: string
  public transacciones: Array<Transaction>
  public nombreConvenio: string

  constructor(result) {
    this.nombreConvenio = result.nombreConvenio
    this.transacciones = new Array<Transaction>()
  }

  private getTotalOutputAmount(state: TransactionState) {
    const total = this.transacciones
      .filter(trx => trx.state === state && trx.type === TranstactionType.Output)
      .reduce((sum, trx) => sum + trx.amount, 0)
    return total
  }

  getTotalInputAmount() {
    const total = this.transacciones
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
    this.transacciones.forEach(transaction => {
      console.log(transition)
    })
  }
}
