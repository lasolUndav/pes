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
  modeEdition = false
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
    return this.serviceProvider.getProvider(this.key)
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
        this.service.updateProvider(provider.key, provider)
        this.onBack()
      }
    })
  }
}
