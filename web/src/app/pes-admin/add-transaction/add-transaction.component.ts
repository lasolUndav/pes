import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

import { Account } from '../model/account'
import { ServiceAccount } from '../service/service-account'
import { Transaction } from '../model/transaction'

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css'],
})
export class AddTransactionComponent implements OnInit {
  transactionInEdition: Transaction
  formTitle: string
  accountKey: string
  type: string
  isNew: boolean
  lastAccountLoaded: string
  selected = 'transactionInEdition.state'
  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceAccount: ServiceAccount
  ) {
    this.accountKey = this.ruteActive.snapshot.paramMap.get('id')
    this.type = this.ruteActive.snapshot.paramMap.get('type')
    this.transactionInEdition = null
    this.lastAccountLoaded = null
  }

  ngOnInit(): void {
    if (this.accountKey === 'null') {
      this.setupFormNewTransaction()
    } else {
      this.setupFormEditTansaction()
    }
  }
  backToAccounts(): void {
    this.route.navigate(['/admin/cuentas'])
  }
  setupFormEditTansaction() {
    this.isNew = false
    this.serviceAccount.getAccount(this.accountKey, data => {
      this.transactionInEdition = new Transaction(data)
      this.formTitle = `Editar transaccion ${this.transactionInEdition.type}`
    })
  }
  setupFormNewTransaction() {
    this.isNew = true
    this.formTitle = 'Agregar nueva transaccion'
    this.transactionInEdition = new Transaction({
      key: '',
      tipo: this.type,
      estado: '',
      monto: '',
      titulo: '',
      descripcion: '',
    })
  }
  saveAccount(account) {
    const jsonAccount = account
    if (this.isNew) {
      this.serviceAccount.createAccount(jsonAccount, accountKey => {
        this.lastAccountLoaded = jsonAccount
        account.key = accountKey
        this.serviceAccount.updateAccount(accountKey, account)
        this.saveAccount(account)
      })
    } else {
      this.serviceAccount.updateAccount(this.accountKey, jsonAccount)
      this.saveTransaction(account)
    }
    this.backToAccounts()
  }

  saveTransaction(account: Account) {
    console.log(this.transactionInEdition.state)
    this.serviceAccount.addTransaction(
      account,
      new Transaction({
        transacciones: this.transactionInEdition,
      })
    )
  }
}
