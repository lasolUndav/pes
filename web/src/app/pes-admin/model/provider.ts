export class Provider {
  key: string
  nombre: string
  localidad: string
  provincia: string
  cuilCuit: string
  tagsRubro: string
  numeroCuenta: string
  nombreContacto: string
  apellidoContacto: string
  telefonoContacto: string
  mail: string
  informacionAdicional: string

  constructor(result) {
    this.key = result.key
    this.nombre = result.nombre
    this.apellidoContacto = result.apellidoContacto
    this.cuilCuit = result.cuilCuit
    this.informacionAdicional = result.informacionAdicional
    this.localidad = result.localidad
    this.mail = result.mail
    this.nombreContacto = result.nombreContacto
    this.numeroCuenta = result.numeroCuenta
    this.provincia = result.provincia
    this.tagsRubro = result.tagsRubro
    this.telefonoContacto = result.telefonoContacto
  }
}
