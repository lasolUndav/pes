import { ActivatedRoute, Router } from '@angular/router'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, OnInit } from '@angular/core'
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
  visible = true
  selectable = true
  removable = true
  addOnBlur = true
  readonly separatorKeysCodes: number[] = [ENTER, COMMA]

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
  add(event: MatChipInputEvent): void {
    const input = event.input
    const value = event.value

    if ((value || '').trim()) {
      if (this.providerInEdition.tagsRubro != '') {
        this.providerInEdition.tagsRubro += ',' + value.trim()
      } else {
        this.providerInEdition.tagsRubro += value.trim()
      }
    }

    if (input) {
      input.value = ''
    }
  }

  getCustomTagSplit(tags: string) {
    if (tags != '') {
      return tags.split(',')
    }
  }

  remove(item: string): void {
    const index = this.providerInEdition.tagsRubro.indexOf(item)
    if (index > 0) {
      this.providerInEdition.tagsRubro = this.providerInEdition.tagsRubro.replace(
        ',' + item,
        ''
      )
    }
    if (item.length === this.providerInEdition.tagsRubro.length) {
      this.providerInEdition.tagsRubro = ''
    } else {
      this.providerInEdition.tagsRubro = this.providerInEdition.tagsRubro.replace(
        item + ',',
        ''
      )
    }
  }
}
