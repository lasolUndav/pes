import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

import { ServiceAccount } from '../service/service-account'
import { Transaction } from '../model/transaction'
import { transformMenu } from '@angular/material'

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  transactionInEdition: Transaction
  service: ServiceAccount
  transactionKey: string
  lastTransactionLoaded: string
  formTitle: string
  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceAccount: ServiceAccount
  ) {
    this.service = serviceAccount
    this.transactionInEdition = null
    this.lastTransactionLoaded = null
  }

  ngOnInit(): void {
    this.transactionKey = this.ruteActive.snapshot.paramMap.get('id')
    if (this.transactionKey === 'null') {
      this.setupFormNewTransaction()
    }
  }
  setupFormNewTransaction() {
    this.formTitle = 'Agregar nueva transacción'
  }
}
