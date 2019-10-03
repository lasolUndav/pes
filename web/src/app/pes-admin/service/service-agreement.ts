import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

import { Account } from '../model/account'
import { Agreement } from '../model/agreement'
import { Injectable } from '@angular/core'
import { ServiceAccount } from '../service/service-account'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ServiceAgreement {
  serviceAccount: ServiceAccount
  lastAccountLoaded: string
  agreementsRef: AngularFireList<Agreement> = null
  constructor(private db: AngularFireDatabase) {
    this.agreementsRef = db.list('/convenios')
  }

  getAgreements(onAgreementsLoaded) {
    this.agreementsRef
      .snapshotChanges()
      .pipe(
        map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
      )
      .subscribe(agreements => {
        const listAgreements = Array<Agreement>()
        agreements.forEach(function(agreement) {
          listAgreements.push(new Agreement(agreement))
        })
        onAgreementsLoaded(listAgreements)
      }, this.handleError)
  }

  getAgreement(key: string, onLoaded) {
    return this.db
      .object(`convenios/${key}`)
      .snapshotChanges()
      .subscribe(data => onLoaded(data.payload.val()))
  }

  createAgreement(agreement: Agreement, onSaved): void {
    this.agreementsRef.push(agreement).then(onSaved)
  }

  createAccountAgreement(account: Account) {
    this.serviceAccount.createAccount(account, () => {
      this.lastAccountLoaded = account.key
    })
    console.log('consol4')
  }

  updateAgreement(key: string, value: any): void {
    this.agreementsRef.update(key, value).catch(error => this.handleError(error))
  }

  deleteAgreement(key: string): void {
    this.agreementsRef.remove(key).catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}
