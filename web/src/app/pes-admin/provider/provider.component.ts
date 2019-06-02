import { ActivatedRoute, Router } from '@angular/router'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, OnInit, ViewChild } from '@angular/core'
import { MatChipInputEvent, MatDialog } from '@angular/material'

import { ConfirmUpdateProviderComponent } from './confirm-update-provider/confirm-update-provider.component'
import { Provider } from '../shared/provider'
import { ServiceProvider } from '../shared/service-provider'

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
})
export class ProviderComponent implements OnInit {
  providerInEdition: Provider
  service: ServiceProvider
  isNew: boolean
  key: string
  constructor(
    public dialog: MatDialog,
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceProvider: ServiceProvider
  ) {
    this.service = serviceProvider
    this.providerInEdition = null
  }

  ngOnInit(): void {
    this.key = this.ruteActive.snapshot.paramMap.get('id')
    if (this.key === 'null') {
      this.isNew = true
      this.providerInEdition = new Provider({
        nombre: '',
        localidad: '',
        provincia: '',
        cuilCuit: '',
        tagsRubro: '',
        numeroCuenta: '',
        nombreContacto: '',
        apellidoContacto: '',
        telefonoContacto: '',
        mail: '',
        informacionAdicional: '',
      })
    } else {
      this.isNew = false
      var scope = this
      this.serviceProvider.getProvider(this.key, function(data) {
        scope.providerInEdition = new Provider(data)
      })
    }
  }

  onBack(): void {
    this.route.navigate(['/admin/proveedores'])
  }

  setDataProvince(provincia) {
    this.providerInEdition.provincia = provincia
  }
  setDataEmail(email) {
    this.providerInEdition.mail = email
  }
  setDataLocality(locality) {
    this.providerInEdition.localidad = locality
  }
  setDataContantName(contantName) {
    this.providerInEdition.nombreContacto = contantName
  }
  setDataName(name) {
    this.providerInEdition.nombre = name
  }
  setDataCuilCuit(cuilCuit) {
    this.providerInEdition.cuilCuit = cuilCuit
  }
  setDataContactPhone(contactPhone) {
    this.providerInEdition.telefonoContacto = contactPhone
  }
  setDataContactSurname(contactSurname) {
    this.providerInEdition.apellidoContacto = contactSurname
  }
  setDataAdditionalInformation(additionalInformation) {
    this.providerInEdition.informacionAdicional = additionalInformation
  }
  setDataNumberAccount(numAccount) {
    this.providerInEdition.numeroCuenta = numAccount
  }

  openDialog(provider) {
    const dialogRef = this.dialog.open(ConfirmUpdateProviderComponent, {
      width: '500px',
      data: provider.nombre,
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'SI') {
        const jsonProvider = provider
        const keyout = 'key'
        delete jsonProvider[keyout]
        if (this.isNew) {
          this.service.createProvider(jsonProvider)
        } else {
          this.service.updateProvider(this.key, jsonProvider)
        }
        this.onBack()
      }
    })
  }
}
