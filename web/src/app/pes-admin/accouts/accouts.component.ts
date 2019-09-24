import { Component, OnInit } from '@angular/core'

import { Account } from '../model/account'
import { ServiceAccount } from '../service/service-account'

@Component({
  selector: 'app-accouts',
  templateUrl: './accouts.component.html',
  styleUrls: ['./accouts.component.css'],
})
export class AccoutsComponent implements OnInit {
  panelOpenAccount = false
  service: ServiceAccount
  accounts: Array<Account>
  constructor(serviceAccount: ServiceAccount) {
    this.service = serviceAccount
  }

  ngOnInit() {
    const scope = this
    this.service.getAccounts(function(accounts) {
      scope.accounts = accounts
    })
  }
}
