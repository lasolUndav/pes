import { Component, OnInit } from '@angular/core'

import { Agreement } from '../model/agreement'
import { AngularFireStorage } from '@angular/fire/storage'
import { FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'
import { ServiceAgreement } from '../service/agreement.service'
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.css'],
})
export class AgreementsComponent implements OnInit {
  panelOpenAgreement = false
  service: ServiceAgreement
  agreements: Array<Agreement>

  constructor(serviceAgreement: ServiceAgreement, private _storage: AngularFireStorage) {
    this.service = serviceAgreement
    this.agreements = null
  }
  uploadProgress: Observable<number>
  uploadURL: Observable<string>
  uploadFile(event) {
    const file = event.target.files[0]
    const filePath = 'convenio'
    const ref = this._storage.ref(filePath)
    const task = ref.put(file)
    // Observe percentage changes
    this.uploadProgress = task.percentageChanges()
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.uploadURL = file.getDownloadURL())))
      .subscribe()
  }

  ngOnInit() {
    const scope = this
    this.service.getAgreements(function(agreements) {
      scope.agreements = agreements
    })
  }
}
