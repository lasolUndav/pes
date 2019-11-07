import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

import { Account } from '../model/account'
import { Injectable } from '@angular/core'
import { Transaction } from '../model/transaction'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ServiceTransaction {
  accountsRef: AngularFireList<Account> = null
  constructor(private db: AngularFireDatabase) {
    this.accountsRef = db.list('/cuentas')
  }

  getTransaction(keyAccount: string, key: string, onLoaded) {
    return this.db
      .object(`cuentas/${keyAccount}/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()))
  }

  private handleError(error) {
    console.log(error)
  }
}
