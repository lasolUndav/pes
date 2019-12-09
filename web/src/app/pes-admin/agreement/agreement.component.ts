import { ActivatedRoute, Router } from '@angular/router'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, OnInit } from '@angular/core'
import { MatChipInputEvent, _MatChipMixinBase } from '@angular/material'

import { Account } from '../model/account'
import { Agreement } from '../model/agreement'
import { AgreementTransactionCategory } from '../model/agreement-transaction-category'
import { ServiceAgreement } from '../service/agreement.service'

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css'],
})
export class AgreementComponent implements OnInit {
  selectable = true
  removable = true
  addOnBlur = true
  readonly separatorKeysCodes: number[] = [ENTER, COMMA]
  checkAccount = false
  enableAccountCreation = false
  agreementInEdition: Agreement
  isNew: boolean
  agreementKey: string
  formTitle: string
  tagsCategory: string

  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceAgreement: ServiceAgreement
  ) {
    this.agreementInEdition = null
    this.tagsCategory = ''
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
  mayusculaPrimera(string): string {
    string.toLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  add(event: MatChipInputEvent): void {
    const input = event.input
    const value = this.mayusculaPrimera(event.value)

    if ((value || '').trim()) {
      this.agreementInEdition.categorias.push(new AgreementTransactionCategory(value))
    }

    if (input) {
      input.value = ''
    }
  }
  remove(item: AgreementTransactionCategory) {
    const indice = this.agreementInEdition.categorias.indexOf(item)
    this.agreementInEdition.categorias.splice(indice, 1)
  }
}
