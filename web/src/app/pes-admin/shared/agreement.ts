export class Agreement {
  key: string
  nombre: string
  periodo: string
  monto: string

  constructor(result) {
    this.key = result.key
    this.nombre = result.nombre
    this.periodo = result.peridodo
    this.monto = result.monto
  }
}
