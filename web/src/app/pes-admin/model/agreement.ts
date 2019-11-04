import { AgreementTransactionCategory } from './agreement-transaction-category'

export class Agreement {
  public key: string
  public nombre: string
  public periodoInicio: Date
  public periodoFin: Date
  public monto: number
  public keyCuenta: string
  public categorias: Array<AgreementTransactionCategory>

  constructor(dto) {
    this.nombre = dto.nombre
    this.periodoInicio = new Date()
    this.periodoFin = new Date()
    this.categorias = new Array<AgreementTransactionCategory>()
    this.monto = dto.monto
    if ('key' in dto) {
      this.key = dto.key
    } else {
      this.key = null
    }

    if ('keyCuenta' in dto) {
      this.keyCuenta = dto.keyCuenta
    } else {
      this.keyCuenta = null
    }
  }

  public toDto() {
    let dto = {
      nombre: this.nombre,
      periodoInicio: this.periodoInicio,
      periodoFin: this.periodoFin,
      monto: this.monto,
    }

    if (this.key != null) {
      dto['key'] = this.key
    }

    if (this.keyCuenta != null) {
      dto['keyCuenta'] = this.keyCuenta
    }

    return dto
  }

  getPeriodFormat(): string {
    return (
      this.periodoInicio.getDay() +
      '/' +
      this.periodoInicio.getMonth() +
      '/' +
      this.periodoInicio.getFullYear() +
      ' - ' +
      this.periodoFin.getDay() +
      '/' +
      this.periodoFin.getMonth() +
      '/' +
      this.periodoFin.getFullYear()
    )
  }

}
