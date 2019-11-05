import { Transaction, TransactionState, TranstactionType } from './transaction'

export class Account {
  public key: string
  public transactions: Array<Transaction>
  public name: string

  constructor(dto) {
    this.key = dto.key
    this.name = dto.nombre
    this.transactions = dto.transacciones
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


}
