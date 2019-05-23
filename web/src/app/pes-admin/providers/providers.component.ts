import { Component, OnInit } from '@angular/core'

import { FormControl } from '@angular/forms'
import { Provider } from '../shared/provider'
import { ServiceProvider } from '../shared/service-provider'

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css'],
})
export class ProvidersComponent implements OnInit {
  service: ServiceProvider
  providers: Array<Provider>
  providersFiltrados: Provider[]
  search = new FormControl('')

  constructor(serviceProvider: ServiceProvider) {
    this.service = serviceProvider
    this.providersFiltrados = null
  }

  applyFilter(filterValue: string) {
    if (filterValue.length === 0) {
      this.providersFiltrados = this.providers
    } else {
      this.providersFiltrados = this.providers.filter(provider =>
        this.filterProviders(provider, filterValue)
      )
    }
  }

  filterProviders(provider: Provider, filterValue: string) {
    filterValue = filterValue.toLowerCase().trim()
    const porNombre = provider.name.toLowerCase()
    const porRubro = provider.tagsItem.toLowerCase()
    const porContacto = provider.contactName.toLowerCase()
    return (
      porNombre.indexOf(filterValue) > 0 ||
      porRubro.indexOf(filterValue) > 0 ||
      porContacto.indexOf(filterValue) > 0
    )
  }
  ngOnInit() {
    this.providersFiltrados = this.providers = this.service.getProviders()
    this.search.valueChanges.subscribe((filterValue: string) =>
      this.applyFilter(filterValue)
    )
  }

  copyText(val: string) {
    let selBox = document.createElement('textarea')
    selBox.style.position = 'fixed'
    selBox.style.left = '0'
    selBox.style.top = '0'
    selBox.style.opacity = '0'
    selBox.value = val
    document.body.appendChild(selBox)
    selBox.focus()
    selBox.select()
    document.execCommand('copy')
    document.body.removeChild(selBox)
  }
}
