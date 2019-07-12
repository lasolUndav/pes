import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

import { Agreement } from '../model/agreement'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ServiceAgreement {
  agreementsRef: AngularFireList<Agreement> = null
  constructor(private db: AngularFireDatabase) {
    this.agreementsRef = db.list('/convenios')
  }

  getAgreement(onAgreementsLoaded) {
    this.agreementsRef
      .snapshotChanges()
      .pipe(
        map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
      )
      .subscribe(agreements => {
        const listAgreements = Array<Agreement>()
        agreements.forEach(function(agreement) {
          listAgreements.push(new Agreement(agreement.name))
        })
        onAgreementsLoaded(listAgreements)
      }, this.handleError)
  }

  private handleError(error) {
    console.log(error)
  }
}
