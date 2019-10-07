import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

import { Account } from '../model/account'
import { ServiceAccount } from '../service/service-account'
import { Transaction } from '../model/transaction'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  continueAdding = false

  accountInEdition: Account
  service: ServiceAccount
  isNew: boolean
  accountKey: string
  lastAccountLoaded: string
  formTitle: string

  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceAccount: ServiceAccount
  ) {
    this.service = serviceAccount
    this.accountInEdition = null
    this.lastAccountLoaded = null
  }

  ngOnInit(): void {
    this.accountKey = this.ruteActive.snapshot.paramMap.get('id')
    if (this.accountKey === 'null') {
      this.setupFormNewAccount()
    } else {
      this.setupFormEditAccount()
    }
  }
  backToAccounts(): void {
    this.route.navigate(['/admin/cuenta'])
  }

  setupFormEditAccount() {
    this.isNew = false
    this.serviceAccount.getAccount(this.accountKey, data => {
      this.accountInEdition = new Account(data)
      this.formTitle = `Editar cuenta ${this.accountInEdition.key}`
    })
  }

  setupFormNewAccount() {
    this.isNew = true
    this.formTitle = 'Agregar nueva cuenta'
    this.accountInEdition = new Account({
      nombre: '',
      transaccion: '',
    })
  }

  saveAccount(account) {
    const jsonAccount = account
    const keyout = 'key'
    delete jsonAccount[keyout]
    if (this.isNew) {
      this.service.createAccount(jsonAccount, () => {
        this.lastAccountLoaded = jsonAccount.key
        if (this.continueAdding) {
          this.setupFormNewAccount()
          this.scrollToTop()
        } else {
          this.backToAccounts()
        }
      })
    } else {
      this.service.updateAccount(this.accountKey, jsonAccount)
      console.log(account)
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
