import { Transaction, TransactionState, TranstactionType } from './transaction'

export class Account {
  public key: string
  public transactions: Array<Transaction>
  public name: string
  public dataTransactions = []

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
    Object.entries(this.transactions).forEach(([keyTransaction, transaction]) => {
      this.dataTransactions.push(keyTransaction.toUpperCase())
      for (const [key, value] of Object.entries(transaction)) {
        let data = key.charAt(0).toUpperCase() + key.substr(1).toLowerCase() + ' : '
        if (key === 'estado') {
          if (value === 0) {
            data += 'Realizado'
          } else {
            data += 'Pendiente'
          }
        } else if (key === 'tipo') {
          if (value === 0) {
            data += 'Ingreso'
          } else {
            data += 'Salida'
          }
        } else {
          data += value
        }

        this.dataTransactions.push(data)
      }
    })
  }
}
