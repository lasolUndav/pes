import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

import { Account } from '../model/account'
import { Agreement } from '../model/agreement'
import { ServiceAgreement } from '../service/service-agreement'
import { disableBindings } from '@angular/core/src/render3'
import { ServiceAccount } from '../service/service-account'
import { Transaction } from '../model/transaction'

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css'],
})
export class AgreementComponent implements OnInit {
  checkAccount = false
  disabled = false
  agreementInEdition: Agreement
  service: ServiceAgreement
  serviceAccountAgreement: ServiceAccount
  isNew: boolean
  agreementKey: string
  lastAgreementLoaded: string
  formTitle: string
  lastAccountLoaded: string

  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceAgreement: ServiceAgreement,
    private serviceAccount: ServiceAccount
  ) {
    this.service = serviceAgreement
    this.serviceAccountAgreement = serviceAccount
    this.agreementInEdition = null
    this.lastAgreementLoaded = null
    this.lastAccountLoaded = null
  }

  ngOnInit(): void {
    this.agreementKey = this.ruteActive.snapshot.paramMap.get('id')
    this.serviceAccountAgreement.getKeyAccount()
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
    this.service.getAgreement(this.agreementKey, data => {
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
      nombre: '',
      periodo: '',
      monto: '',
      keyCuenta: '',
    })
  }

  saveAgreement(agreement) {
    const jsonAgreement = agreement
    const keyout = 'key'
    delete jsonAgreement[keyout]
    if (this.isNew) {
      this.saveAccount()
      this.service.createAgreement(jsonAgreement, () => {
        this.lastAgreementLoaded = jsonAgreement.nombre
      })
    } else {
      this.saveAccount()
      this.service.updateAgreement(this.agreementKey, jsonAgreement)
    }
    this.backToAgreements()
  }

  saveAccount() {
    if (this.checkAccount) {
      const account = new Account({
        nombreConvenio: this.agreementInEdition.nombre,
        transacciones: null,
      })
      const keyout = 'key'
      delete account[keyout]
      this.serviceAccountAgreement.createAccount(account, () => {
        this.lastAccountLoaded = account.key
      })
    }
    this.disabled = true
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
