import { AngularFireDatabase } from '@angular/fire/database'
import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Provider } from './provider'

@Injectable({
  providedIn: 'root',
})
export class ServiceProvider {
  listProviders = Array<Provider>()

  constructor(db: AngularFireDatabase) {
    db.list('proveedores')
      .valueChanges()
      .subscribe(resultsProvider => {
        this.parseProvider(resultsProvider)
      })
  }
  parseProvider(jsonProvider) {
    for (let i = 0; i < jsonProvider.length; i++) {
      this.listProviders.push(new Provider(jsonProvider[i]))
    }
  }
  getProviders() {
    return this.listProviders
  }
}
