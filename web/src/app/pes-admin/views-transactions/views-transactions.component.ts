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
  account1: Account
  service: ServiceAccount
  transactionsOutput: Array<Transaction>
  transactionsInput: Array<Transaction>
  panelOpenTransaction = false
  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceAccount: ServiceAccount
  ) {
    this.service = serviceAccount
    this.account1 = null
    this.transactionsInput = new Array<Transaction>()
    this.transactionsOutput = new Array<Transaction>()
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
      this.account1 = new Account(data)
      this.loadTransactions(this.account1)
      console.log(this.transactionsInput)
    })
  }
  loadTransactions(account: Account) {
    Object.entries(account.transactions).forEach(([_, transaction]) => {
      if (transaction.type === 1) {
        this.transactionsOutput.push(transaction)
      } else {
        this.transactionsInput.push(transaction)
      }
    })
  }
}
