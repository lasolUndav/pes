import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

import { Account } from '../model/account'
import { Agreement } from '../model/agreement'
import { ServiceAgreement } from '../service/agreement.service'

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css'],
})
export class AgreementComponent implements OnInit {
  checkAccount = false
  enableAccountCreation = false
  agreementInEdition: Agreement
  isNew: boolean
  agreementKey: string
  formTitle: string

  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceAgreement: ServiceAgreement
  ) {
    this.agreementInEdition = null
  }

  ngOnInit(): void {
    this.agreementKey = this.ruteActive.snapshot.paramMap.get('id')
    if (this.agreementKey === 'null') {
      this.setupFormNewAgreement()
    } else {
      this.setupFormEditAgreement()
    }
  }
  backToAgreements(): void {
    this.route.navigate(['/admin/convenios'])
  }

  setupFormEditAgreement() {
    this.isNew = false
    this.serviceAgreement.getAgreement(this.agreementKey, dto => {
      this.agreementInEdition = new Agreement(dto)
      this.formTitle = `Editar convenio ${this.agreementInEdition.nombre}`
      this.enableAccountCreation = this.agreementInEdition.keyCuenta == null
    })
  }

  setupFormNewAgreement() {
    this.isNew = true
    this.enableAccountCreation = true
    this.formTitle = 'Agregar nuevo convenio'
    this.agreementInEdition = new Agreement({
      nombre: '',
      periodoInicio: new Date(),
      periodoFin: new Date(),
      monto: '',
    })
  }

  saveAgreement(agreement) {
    if (this.isNew) {
      this.serviceAgreement.createAgreement(agreement.toDto(), agreementKey => {
        agreement.key = agreementKey
        this.serviceAgreement.updateAgreement(agreementKey, agreement.toDto())
        this.saveAccount(agreement)
      })
    } else {
      this.serviceAgreement.updateAgreement(this.agreementKey, agreement.toDto())
      this.saveAccount(agreement)
    }
    this.backToAgreements()
  }

  saveAccount(agreement: Agreement) {
    if (this.checkAccount) {
      this.serviceAgreement.addAccount(
        agreement,
        new Account({
          nombre: this.agreementInEdition.nombre,
        })
      )
    }
  }
}
