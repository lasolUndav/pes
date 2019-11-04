import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

import { Account } from '../model/account'
import { Injectable } from '@angular/core'
import { Transaction } from '../model/transaction'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ServiceAccount {
  accountsRef: AngularFireList<Account> = null
  constructor(private db: AngularFireDatabase) {
    this.accountsRef = db.list('/cuentas')
  }
  getAccounts(onAccountsLoaded) {
    this.accountsRef
      .snapshotChanges()
      .pipe(
        map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
      )
      .subscribe(accounts => {
        const listAccounts = Array<Account>()
        accounts.forEach(function(account) {
          listAccounts.push(new Account(account))
        })
        onAccountsLoaded(listAccounts)
      }, this.handleError)
  }

  getAccount(key: string, onLoaded) {
    return this.db
      .object(`cuentas/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()))
  }
  getTransactions(key: string, onLoaded) {
    return this.db
      .object(`cuentas/${key}/transacciones`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()))
  }

  addTransaction(accountKey: string, transaction: Transaction) {
    const transactionsRef = this.db.list(`/cuentas/${accountKey}/transacciones`)
    transactionsRef.push(transaction.toDto())
  }

  createAccount(account: any, onSaved): void {
    var key = this.accountsRef.push(account).key
    onSaved(key)
  }

  updateAccount(key: string, value: any): void {
    this.accountsRef.update(key, value).catch(error => this.handleError(error))
  }

  deleteAccount(key: string): void {
    this.accountsRef.remove(key).catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
