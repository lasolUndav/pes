import { Component, OnInit } from '@angular/core'

import { Agreement } from '../model/agreement'
import { ServiceAgreement } from '../service/service-agreement'

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.css'],
})
export class AgreementsComponent implements OnInit {
  panelOpenAgreement = false
  service: ServiceAgreement
  agreements: Array<Agreement>
  constructor(serviceAgreement: ServiceAgreement) {
    this.service = serviceAgreement
    this.agreements = null
  }

  ngOnInit() {
    const scope = this
    this.service.getAgreements(function(agreements) {
      scope.agreements = agreements
    })
  }
}
