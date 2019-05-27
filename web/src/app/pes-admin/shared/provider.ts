export class Provider {
  key: string;
  name: string
  locality: string
  province: string
  cuilCuit: string
  tagsItem: string
  numAccount: string
  contactName: string
  contactSurname: string
  contactPhone: string
  email: string
  additionalInformation: string

  constructor(result) {
    this.key = result.key
    this.name = result.nombre
    this.contactSurname = result.apellidoContacto
    this.cuilCuit = result.cuilCuit
    this.additionalInformation = result.informacionAdicional
    this.locality = result.localidad
    this.email = result.mail
    this.contactName = result.nombreContacto
    this.numAccount = result.numeroCuenta
    this.province = result.provincia
    this.tagsItem = result.tagsRubro
    this.contactPhone = result.telefonoContacto
  }
}
