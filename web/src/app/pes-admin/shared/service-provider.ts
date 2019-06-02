import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

import { Injectable } from '@angular/core'
import { Provider } from './provider'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ServiceProvider {
  providersRef: AngularFireList<Provider> = null
  providers: any

  constructor(private db: AngularFireDatabase) {
    this.providersRef = db.list('/proveedores')
  }

  getProviders(onProvidersLoaded) {
    this.providersRef
      .snapshotChanges()
      .pipe(
        map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
      )
      .subscribe(providers => {
        const listProviders = Array<Provider>()
        providers.forEach(function(provider) {
          listProviders.push(new Provider(provider))
        })
        onProvidersLoaded(listProviders)
      }, this.handleError)
  }
  getProvider(key: string, onLoaded) {
    return this.db
      .object(`proveedores/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()))
  }
  createProvider(provider: Provider): void {
    this.providersRef.push(provider)
  }

  updateProvider(key: string, value: any): void {
    console.log(value, 'dentro del updateProvider')
    this.providersRef.update(key, value).catch(error => this.handleError(error))
  }

  deleteProvider(key: string): void {
    this.providersRef.remove(key).catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
