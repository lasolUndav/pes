import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

import { AddTransactionType } from '../model/add-transaction-type'
import { Provider } from '../model/provider'
import { ServiceProvider } from '../service/provider.service'
import { ServiceTransaction } from '../service/transaction.service'
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
    this.setupFormEditTransaction()
    var scope = this
    this.serviceProvider.getProviders(function(providers) {
      scope.providers = providers
    })
  }

  setupFormEditTransaction() {
    this.serviceTransaction.getTransaction(this.accountKey, this.transactionKey, dto => {
      this.transactionInEdition = new Transaction(dto)
      this.formTitle = `Editar transaccion`
    })
  }

  saveTransaction(transaction: Transaction) {
    if (transaction.keyProvider != null) {
      transaction.provider = this.providers.find(b => b.key === transaction.keyProvider)
      transaction.shortDescription = `Pago a proveedor [${transaction.provider.nombre}]`
    }
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
