import { Component, OnInit } from '@angular/core'

import { ConfirmDeleteProviderComponent } from './confirm-delete-provider/confirm-delete-provider.component'
import { FormControl } from '@angular/forms'
import { MatDialog } from '@angular/material'
import { Provider } from '../shared/provider'
import { ProviderDetailComponent } from './provider-detail/provider-detail.component'
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

  constructor(public dialog: MatDialog, serviceProvider: ServiceProvider) {
    this.service = serviceProvider
    this.providersFiltrados = null
  }

  ngOnInit() {
    var scope = this
    this.service.getProviders(function(providers) {
      scope.providers = providers
      scope.applyFilter(scope.search.value)
    })
    this.search.valueChanges.subscribe((filterValue: string) =>
      this.applyFilter(filterValue)
    )
  }

  applyFilter(filterValue: string) {
    if (filterValue.length === 0) {
      this.providersFiltrados = this.providers
    } else {
      this.providersFiltrados = this.providers.filter(provider =>
        this.filterProvider(provider, filterValue)
      )
    }
  }

  copyAccountData(val: Provider) {
    const selBox = document.createElement('textarea')
    selBox.style.position = 'fixed'
    selBox.style.left = '0'
    selBox.style.top = '0'
    selBox.style.opacity = '0'
    selBox.value =
      val.cuilCuit.length === 0
        ? val.numeroCuenta
        : `${val.cuilCuit}\n${val.numeroCuenta}`
    document.body.appendChild(selBox)
    selBox.focus()
    selBox.select()
    document.execCommand('copy')
    document.body.removeChild(selBox)
  }

  openDialog(provider) {
    const dialogRef = this.dialog.open(ConfirmDeleteProviderComponent, {
      width: '500px',
      data: provider.nombre,
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'SI') {
        this.service.deleteProvider(provider.key)
      }
    })
  }

  openInfo(provider) {
    const dialogRefI = this.dialog.open(ProviderDetailComponent, {
      width: '400px',
      data: provider,
    })
  }

  private filterProvider(provider: Provider, filterValue: string) {
    filterValue = filterValue.toLowerCase().trim()
    const porNombre = provider.nombre.toLowerCase()
    const porRubro = provider.tagsRubro.toLowerCase()
    const porContacto = provider.nombreContacto.toLowerCase()
    return (
      porNombre.indexOf(filterValue) >= 0 ||
      porRubro.indexOf(filterValue) >= 0 ||
      porContacto.indexOf(filterValue) >= 0
    )
  }
}
