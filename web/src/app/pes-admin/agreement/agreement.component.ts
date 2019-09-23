import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

import { Agreement } from '../model/agreement'
import { ServiceAgreement } from '../service/service-agreement'
import { disableBindings } from '@angular/core/src/render3'

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
  isNew: boolean
  agreementKey: string
  lastAgreementLoaded: string
  formTitle: string

  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceAgreement: ServiceAgreement
  ) {
    this.service = serviceAgreement
    this.agreementInEdition = null
    this.lastAgreementLoaded = null
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
    })
  }

  setupFormNewAgreement() {
    this.isNew = true
    this.formTitle = 'Agregar nuevo proveedor'
    this.agreementInEdition = new Agreement({
      nombre: '',
      periodo: '',
      monto: '',
    })
  }

  saveAgreement(agreement) {
    const jsonAgreement = agreement
    const keyout = 'key'
    delete jsonAgreement[keyout]
    if (this.isNew) {
      this.service.createAgreement(jsonAgreement, () => {
        this.lastAgreementLoaded = jsonAgreement.nombre
        this.createAccount()
      })
    } else {
      this.createAccount()
      this.service.updateAgreement(this.agreementKey, jsonAgreement)
    }
    this.backToAgreements()
  }

  createAccount() {
    if (this.checkAccount) {
      //agregar el or para ver si la key de cuenta es undefined
      this.disabled = true
      console.log(this.checkAccount)
      //CREA LA CUENTA
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
