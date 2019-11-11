import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

import { Account } from '../model/account'
import { Injectable } from '@angular/core'
import { ServiceAccount } from './service-account'
import { Transaction } from '../model/transaction'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ServiceTransaction {
  service: ServiceAccount
  accountKey: string
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
    const transactionsRef = this.db.list(`/cuentas/${keyAccount}/transacciones/${key}`)
    transactionsRef.update(key, value).catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
