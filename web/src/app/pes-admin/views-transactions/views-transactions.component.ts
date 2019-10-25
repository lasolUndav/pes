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
  transactions: Array<Transaction>
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
    this.account = null
    this.accountKey = this.ruteActive.snapshot.paramMap.get('id')
    this.transactions = new Array<Transaction>()
    this.transactionsInput = new Array<Transaction>()
    this.transactionsOutput = new Array<Transaction>()
  }

  ngOnInit(): void {
    this.loadAccount()
    console.log(this.transactionsInput)
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
    Object.entries(account.transactions).forEach(([_, transaction]) => {
      if (transaction.type === 1) {
        this.transactionsOutput.push(new Transaction(transaction))
      } else {
        this.transactionsInput.push(new Transaction(transaction))
      }
    })
  }
}
