import { ActivatedRoute, Router } from '@angular/router'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatChipInputEvent, MatDialog } from '@angular/material'

import { ConfirmUpdateProviderComponent } from './confirm-update-provider/confirm-update-provider.component'
import { Provider } from '../shared/provider'
import { ServiceProvider } from '../shared/service-provider'

export interface Item {
  name: string
}
@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
})
export class ProviderComponent implements OnInit {
  visible = true
  selectable = true
  removable = true
  addOnBlur = true
  readonly separatorKeysCodes: number[] = [ENTER, COMMA]
  items: Item[] = [
    { name: 'Queso' },
    { name: 'Carne Vacuna' },
    { name: 'Dulce de Leche' },
  ]

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
  setDataItemsTags(tagsItems) {
    this.providerInEdition.tagsRubro = tagsItems
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

  getItems(providerInEdition1) {
    var retorno = JSON.stringify(providerInEdition1.tagsRubro)
    console.log(retorno)
    return [retorno]
  }

  add(event: MatChipInputEvent): void {
    const input = event.input
    const value = event.value

    // Add our fruit
    if ((value || '').trim()) {
      this.items.push({ name: value.trim() })
    }

    // Reset the input value
    if (input) {
      input.value = ''
    }
  }

  remove(item: Item): void {
    const index = this.items.indexOf(item)

    if (index >= 0) {
      this.items.splice(index, 1)
    }
  }
}
