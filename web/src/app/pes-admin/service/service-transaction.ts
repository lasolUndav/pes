import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

import { Account } from '../model/account'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ServiceTransaction {
  accountsRef: AngularFireList<Account>
  constructor(private db: AngularFireDatabase) {
    this.accountsRef = db.list('cuentas/')
  }

  getTransaction(keyAccount: string, key: string, onLoaded) {
    return this.db
      .object(`cuentas/${keyAccount}/transacciones/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()))
  }
  updateTransaction(keyAccount: string, key: string, value: any): void {
    var transactionsRef = this.db.list(`/cuentas/${keyAccount}/transacciones/`)
    transactionsRef.update(key, value).catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
