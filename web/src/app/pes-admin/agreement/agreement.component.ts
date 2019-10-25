import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

import { Account } from '../model/account'
import { Agreement } from '../model/agreement'
import { ServiceAgreement } from '../service/service-agreement'

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css'],
})
export class AgreementComponent implements OnInit {
  checkAccount = false
  disabled = false
  agreementInEdition: Agreement
  isNew: boolean
  agreementKey: string
  lastAgreementLoaded: string
  formTitle: string
  lastAccountLoaded: string

  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceAgreement: ServiceAgreement
  ) {
    this.agreementInEdition = null
    this.lastAgreementLoaded = null
    this.lastAccountLoaded = null
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
    this.serviceAgreement.getAgreement(this.agreementKey, data => {
      this.agreementInEdition = new Agreement(data)
      this.formTitle = `Editar convenio ${this.agreementInEdition.nombre}`
      if (this.agreementInEdition.keyCuenta !== '') {
        this.disabled = true
      }
    })
  }

  setupFormNewAgreement() {
    this.isNew = true
    this.formTitle = 'Agregar nuevo proveedor'
    this.agreementInEdition = new Agreement({
      key: '',
      nombre: '',
      periodoInicio: new Date(),
      periodoFin: new Date(),
      monto: '',
      keyCuenta: '',
    })
  }

  saveAgreement(agreement) {
    const jsonAgreement = agreement
    if (this.isNew) {
      this.serviceAgreement.createAgreement(jsonAgreement, agreementKey => {
        this.lastAgreementLoaded = jsonAgreement.nombre
        agreement.key = agreementKey
        this.serviceAgreement.updateAgreement(agreementKey, agreement)
        this.saveAccount(agreement)
      })
    } else {
      this.serviceAgreement.updateAgreement(this.agreementKey, jsonAgreement)
      this.saveAccount(agreement)
    }
    this.backToAgreements()
  }

  saveAccount(agreement: Agreement) {
    if (this.checkAccount) {
      this.serviceAgreement.addAccount(
        agreement,
        new Account({
          nombreConvenio: this.agreementInEdition.nombre,
          transacciones: null,
        })
      )
    }
    this.disabled = true
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
