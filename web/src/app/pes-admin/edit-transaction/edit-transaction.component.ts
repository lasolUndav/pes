import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, Provider } from '@angular/core'

import { AddTransactionType } from '../model/add-transaction-type'
import { ServiceAccount } from '../service/service-account'
import { ServiceProvider } from '../service/service-provider'
import { ServiceTransaction } from '../service/service-transaction'
import { Transaction } from '../model/transaction'

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css'],
})
export class EditTransactionComponent implements OnInit {
  transactionKey: string
  accountKey: string
  transactionInEdition: Transaction
  formTitle: string
  type: AddTransactionType
  providers: Array<Provider>
  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceTransaction: ServiceTransaction,
    private serviceProvider: ServiceProvider
  ) {
    this.transactionInEdition = null
    this.providers = null
    this.accountKey = this.ruteActive.snapshot.paramMap.get('idAccount')
    this.type = AddTransactionType[this.ruteActive.snapshot.paramMap.get('type')]
    this.transactionKey = this.ruteActive.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    this.serviceTransaction.accountKey = this.accountKey
    this.setupFormEditTransaction()
    var scope = this
    this.serviceProvider.getProviders(function(providers) {
      scope.providers = providers
    })
  }

  setupFormEditTransaction() {
    this.serviceTransaction.getTransaction(this.accountKey, this.transactionKey, dto => {
      this.transactionInEdition = new Transaction(dto)
      this.formTitle = `Editar monto ${this.transactionInEdition.amount}`
    })
  }
  saveTransaction(transaction: Transaction) {
    this.serviceTransaction.updateTransaction(
      this.accountKey,
      this.transactionKey,
      transaction.toDto()
    )
    this.backToTransactions()
  }

  backToTransactions(): void {
    this.route.navigate([`/admin/transacciones/${this.accountKey}`])
  }
}
