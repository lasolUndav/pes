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

    this.providers = serviceProvider.getProviders()
    this.providersFiltrados = this.providers
  }
  applyFilter(filterValue: string) {
    this.providersFiltrados = this.providers.filter(provider =>
      this.filterProviders(provider, filterValue)
    )
  }

  filterProviders(provider, filterValue: string) {
    filterValue = filterValue.toLowerCase().trim()
    console.log(filterValue)
    let porNombre = provider.name.toLowerCase()
    let porRubro = provider.tagsItem.toLowerCase()
    return (porNombre.indexOf(filterValue) && porRubro.indexOf(filterValue)) >= 0
  }
  ngOnInit() {
    this.search.valueChanges.subscribe((filterValue: string) =>
      this.applyFilter(filterValue)
    )
  }
}
