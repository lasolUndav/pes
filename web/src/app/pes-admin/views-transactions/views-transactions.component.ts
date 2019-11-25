import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

import { Account } from '../model/account'
import { ServiceAccount } from '../service/account.service'
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
    this.accountKey = this.ruteActive.snapshot.paramMap.get('id')
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
    if (account.transactions !== null) {
      account.transactions.forEach(transaction => {
        if (transaction.type === 1) {
          this.transactionsOutput.push(transaction)
        } else {
          this.transactionsInput.push(transaction)
        }
      })
    }
  }
}
