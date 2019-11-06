import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

import { Account } from '../model/account'
import { ServiceAccount } from '../service/service-account'
import { Transaction } from '../model/transaction'

@Component({
  selector: 'app-views-transactions',
  templateUrl: './views-transactions.component.html',
  styleUrls: ['./views-transactions.component.css'],
})
export class ViewsTransactionsComponent implements OnInit {
  accountKey: string
  account: Account
  service: ServiceAccount
  transactionsOutput = []
  transactionsInput = []
  panelOpenTransaction = false
  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceAccount: ServiceAccount
  ) {
    this.service = serviceAccount
    this.account = null
    this.accountKey = this.ruteActive.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.loadAccount()
  }
  backToAccounts(): void {
    this.route.navigate(['/admin/cuentas'])
  }
  loadAccount() {
    this.serviceAccount.getAccount(this.accountKey, data => {
      this.account = new Account(data)
      this.loadTransaction(this.account)
    })
  }

  loadTransaction(account: Account) {
    var tipo
    Object.entries(account.transactions).forEach(([_, transaction]) => {
      tipo= transaction['tipo']
      if (tipo === 1) {
        this.transactionsOutput.push(new Transaction(transaction))
      } else {
        this.transactionsInput.push(new Transaction(transaction))
      }
    })
  }
}
