import { Component, OnInit } from '@angular/core'

import { Agreement } from '../modal/agreement'
import { ServiceAgreement } from '../service/service-agreement'

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css'],
})
export class AgreementComponent implements OnInit {
  panelOpenAgreement = false
  service: ServiceAgreement
  agreements: Array<Agreement>
  constructor(serviceAgreement: ServiceAgreement) {
    this.service = serviceAgreement
  }

  ngOnInit() {
    var scope = this
    this.service.getAgreement(function(agreements) {
      scope.agreements = agreements
    })
  }
}
