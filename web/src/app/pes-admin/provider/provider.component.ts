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
        contactoNombre: '',
        contactoApellido: '',
        contactoTelefono: '',
        mail: '',
        informationAdicional: '',
      })
    } else {
      this.isNew = false
      var scope = this
      this.serviceProvider.getProvider(this.key, function(data) {
        console.log('vino el provider', data)
        scope.providerInEdition = new Provider(data)
      })
    }
  }

  onBack(): void {
    this.route.navigate(['/admin/proveedores'])
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

        console.log(jsonProvider)
        this.service.updateProvider(this.key, jsonProvider)
        this.onBack()
      }
    })
  }
}
