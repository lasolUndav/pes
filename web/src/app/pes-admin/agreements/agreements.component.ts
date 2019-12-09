import { Component, OnInit } from '@angular/core'

import { Agreement } from '../model/agreement'
import { AngularFireStorage } from '@angular/fire/storage'
import { ServiceAgreement } from '../service/agreement.service'

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.css'],
})
export class AgreementsComponent implements OnInit {
  panelOpenAgreement = false
  service: ServiceAgreement
  agreements: Array<Agreement>
  constructor(serviceAgreement: ServiceAgreement, private afStorage: AngularFireStorage) {
    this.service = serviceAgreement
    this.agreements = null
  }
  upload(event) {
    this.afStorage.upload('/upload/to/this-path', event.target.files[0])
  }
  ngOnInit() {
    const scope = this
    this.service.getAgreements(function(agreements) {
      scope.agreements = agreements
    })
  }
}
