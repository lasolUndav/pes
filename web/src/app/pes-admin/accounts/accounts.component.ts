import { Component, OnInit } from '@angular/core'

import { Account } from '../model/account'
import { ServiceAccount } from '../service/service-account'

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  panelOpenAccount = false
  service: ServiceAccount
  accounts: Array<Account>

  constructor(serviceAccount: ServiceAccount) {
    this.service = serviceAccount
    this.accounts = null
  }
  ngOnInit() {
    const scope = this
    this.service.getAccounts(function(accounts) {
      scope.accounts = accounts
    })
  }
}
