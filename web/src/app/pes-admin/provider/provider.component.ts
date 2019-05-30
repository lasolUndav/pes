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
  provider: Provider
  key: string
  modeEdition = true
  service: ServiceProvider
  constructor(
    public dialog: MatDialog,
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceProvider: ServiceProvider
  ) {
    this.service = serviceProvider
  }

  ngOnInit(): void {
    this.provider = this.getProvider()
  }

  getProvider() {
    this.key = this.ruteActive.snapshot.paramMap.get('id')
    if (this.key === 'null') {
      this.modeEdition = false
      var large = this.serviceProvider.getProviders().length
      var newKey = 'prov-' + large.toString()
      var result = [
        {
          nombre: '',
          localidad: '',
          provincia: '',
          cuilCuit: '',
          tagsRubro: '',
          numeroCuenta: '',
          contactoNombre: '',
          contactoApellido: '',
          contactoTelefono: '',
          mail: '',
          informationAdicional: '',
        },
      ]
      var newProvider = new Provider(result)
      //console.log(newKey)
      console.log(newProvider, 'proveedor creado')
      this.serviceProvider.createProvider(newProvider)
      console.log(newProvider, 'proveedor despues ')
    } else {
      return this.serviceProvider.getProvider(this.key)
    }
  }

  onBack(): void {
    this.route.navigate(['/admin/proveedores'])
  }
  openDialog(provider) {
    const dialogRef = this.dialog.open(ConfirmUpdateProviderComponent, {
      width: '500px',
      data: provider.name,
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'SI') {
        // const jsonProvider = JSON.stringify(provider)
        const jsonProvider = provider

        const keyout = 'key'
        console.log(jsonProvider)

        delete jsonProvider[keyout]
        console.log(jsonProvider, '...')
        console.log(provider)
        // this.service.updateProvider(provider.key, provider)
        this.onBack()
      }
    })
  }
}
