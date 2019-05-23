import { Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Provider } from './provider'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServiceProvider {
  listProviders = Array<Provider>()
  providersRef: AngularFireList<Provider> = null;
  providers: any;


  constructor(private db: AngularFireDatabase) {
    this.providersRef = db.list('/proveedores');
    this.getProvidersList();
  }

  getProvidersList() {
    this.providersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(providers => {
      this.providers = providers;
      this.parseProvider(this.providers);
    });
  }
  
  parseProvider(jsonProvider) {
    for (let i = 0; i < jsonProvider.length; i++) {
      this.listProviders.push(new Provider(jsonProvider[i]))
    }
  }
  getProviders() {
    return this.listProviders
  }

  createProvider(provider: Provider): void {
    this.providersRef.push(provider);
  }

  updateProvider(key: string, value: any): void {
    this.providersRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteProvider(key: string): void {
    this.providersRef.remove(key).catch(error => this.handleError(error));
  }

  deleteAll(): void {
    this.providersRef.remove().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }  
}