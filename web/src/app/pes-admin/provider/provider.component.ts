import { ActivatedRoute, Router } from '@angular/router'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, OnInit } from '@angular/core'

import { MatChipInputEvent } from '@angular/material'
import { Provider } from '../model/provider'
import { ServiceProvider } from '../service/service-provider'

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
})
export class ProviderComponent implements OnInit {
  continueAdding = false
  selectable = true
  removable = true
  addOnBlur = true
  readonly separatorKeysCodes: number[] = [ENTER, COMMA]

  providerInEdition: Provider
  service: ServiceProvider
  isNew: boolean
  providerKey: string
  ultimoProveedorCargado: string
  formTitle: string

  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceProvider: ServiceProvider
  ) {
    this.service = serviceProvider
    this.providerInEdition = null
    this.ultimoProveedorCargado = null
  }

  ngOnInit(): void {
    this.providerKey = this.ruteActive.snapshot.paramMap.get('id')
    if (this.providerKey === 'null') {
      this.setupFormNewProvider()
    } else {
      this.setupFormEditProvider()
    }
  }
  backToProviders(): void {
    this.route.navigate(['/admin/proveedores'])
  }

  setupFormEditProvider() {
    this.isNew = false
    this.serviceProvider.getProvider(this.providerKey, data => {
      this.providerInEdition = new Provider(data)
      this.formTitle = `Editar proveedor ${this.providerInEdition.nombre}`
    })
  }

  setupFormNewProvider() {
    this.isNew = true
    this.formTitle = 'Agregar nuevo proveedor'
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
      this.service.createProvider(jsonProvider, () => {
        this.ultimoProveedorCargado = jsonProvider.nombre
        if (this.continueAdding) {
          this.setupFormNewProvider()
          this.scrollToTop()
        } else {
          this.backToProviders()
        }
      })
    } else {
      this.service.updateProvider(this.providerKey, jsonProvider)
      console.log(provider)
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
