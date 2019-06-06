import { ActivatedRoute, Router } from '@angular/router'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, OnInit } from '@angular/core'

import { MatChipInputEvent } from '@angular/material'
import { Provider } from '../shared/provider'
import { ServiceProvider } from '../shared/service-provider'

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
})
export class ProviderComponent implements OnInit {
  checkeado = false
  visible = true
  selectable = true
  removable = true
  addOnBlur = true
  readonly separatorKeysCodes: number[] = [ENTER, COMMA]

  providerInEdition: Provider
  service: ServiceProvider
  isNew: boolean
  providerKey: string

  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceProvider: ServiceProvider
  ) {
    this.service = serviceProvider
    this.providerInEdition = null
  }

  ngOnInit(): void {
    this.providerKey = this.ruteActive.snapshot.paramMap.get('id')
    if (this.providerKey === 'null') {
      this.setupFormNewProvider()
    } else {
      this.setupFormEditProvider()
    }
  }

  onBack(): void {
    this.route.navigate(['/admin/proveedores'])
  }

  setupFormEditProvider() {
    this.isNew = false
    var scope = this
    this.serviceProvider.getProvider(this.providerKey, function(data) {
      scope.providerInEdition = new Provider(data)
    })
  }

  setupFormNewProvider() {
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
  }

  saveProvider(provider) {
    this.mayusculasProvider(provider)
    const jsonProvider = provider
    const keyout = 'key'
    delete jsonProvider[keyout]
    if (this.isNew) {
      this.service.createProvider(jsonProvider)
    } else {
      this.service.updateProvider(this.providerKey, jsonProvider)
      console.log(provider)
    }
    this.onBack()
  }
  mayusculasProvider(provider: Provider) {
    provider.nombre = this.mayusculaPrimera(provider.nombre)
    provider.nombreContacto = this.mayusculaPrimera(provider.nombreContacto)
    provider.apellidoContacto = this.mayusculaPrimera(provider.apellidoContacto)
    provider.localidad = this.mayusculaPrimera(provider.localidad)
    provider.provincia = this.mayusculaPrimera(provider.provincia)
  }
  add(event: MatChipInputEvent): void {
    const input = event.input
    const value = this.mayusculaPrimera(event.value)

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

  mayusculaPrimera(string): string {
    string.toLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1)
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
