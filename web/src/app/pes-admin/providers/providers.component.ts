import { Component, OnInit } from '@angular/core'

import { FormControl } from '@angular/forms'
import { Provider } from '../shared/provider'
import { ServiceProvider } from '../shared/service-provider'
import { DialogProviderComponent } from '../dialog-provider/dialog-provider.component'
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css'],
})
export class ProvidersComponent implements OnInit {
  service: ServiceProvider
  providers: Array <Provider>;
  providersFiltrados: Provider[]
  search = new FormControl('')

  constructor(public dialog: MatDialog, serviceProvider: ServiceProvider) {
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
    var porNombre = provider.name.toLowerCase()
    var porRubro = provider.tagsItem.toLowerCase()
    return (porNombre.indexOf(filterValue) && porRubro.indexOf(filterValue)) >= 0
  }
  ngOnInit() {
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

  openDialog(provider) {
    const dialogRef = this.dialog.open(DialogProviderComponent, {
      width: '500px',
      data: provider.name
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "SI") {
        this.service.deleteProvider(provider.key);
      }
    });
  }
}
