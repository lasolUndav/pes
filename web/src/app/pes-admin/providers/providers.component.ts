import { Component, OnInit } from '@angular/core'

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
  constructor(serviceProvider: ServiceProvider) {
    this.service = serviceProvider

    this.providers = serviceProvider.getProviders()
  }
  ngOnInit() {}
}
