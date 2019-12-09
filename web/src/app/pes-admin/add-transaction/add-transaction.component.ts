import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Transaction, TranstactionType } from '../model/transaction'

import { Account } from '../model/account'
import { AddTransactionType } from '../model/add-transaction-type'
import { AgreementTransactionCategory } from '../model/agreement-transaction-category'
import { Provider } from '../model/provider'
import { ServiceAccount } from '../service/account.service'
import { ServiceAgreement } from '../service/agreement.service'
import { ServiceProvider } from '../service/provider.service'

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css'],
})
export class AddTransactionComponent implements OnInit {
  providers: Array<Provider>
  transactionInEdition: Transaction
  formTitle: string
  accountKey: string
  agreementKey: string
  type: AddTransactionType
  categorys: Array<AgreementTransactionCategory>

  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private serviceAccount: ServiceAccount,
    private serviceProvider: ServiceProvider,
    private serviceAgreement: ServiceAgreement
  ) {
    this.accountKey = this.ruteActive.snapshot.paramMap.get('id')
    // Casteo de string a enum
    this.type = AddTransactionType[this.ruteActive.snapshot.paramMap.get('type')]
    this.transactionInEdition = null
    this.providers = null
    this.serviceAccount.getAccount(this.accountKey, account => {
      this.serviceAgreement.getAgreement(account.keyConvenio, agreement => {
        this.categorys = agreement.categorias
      })
    })
  }

  ngOnInit(): void {
    this.setupFormNewTransaction()
    var scope = this
    this.serviceProvider.getProviders(function (providers) {
      scope.providers = providers
    })
  }
  backToAccounts(): void {
    this.route.navigate(['/admin/cuentas'])
  }
  setupFormNewTransaction() {
    switch (this.type) {
      case AddTransactionType.NormalInput:
        this.formTitle = 'Alta de ingreso'
        this.transactionInEdition = new Transaction({
          tipo: TranstactionType.Input,
        })
        break
      case AddTransactionType.ProviderPayOutput:
        this.formTitle = 'Alta de pago a proveedor'
        this.transactionInEdition = new Transaction({
          tipo: TranstactionType.Output,
        })
        break
      case AddTransactionType.NormalOutput:
        this.formTitle = 'Alta de pago general'
        this.transactionInEdition = new Transaction({
          tipo: TranstactionType.Output,
        })
        break
      default:
        this.formTitle = 'Error!!!'
        break
    }
  }

  saveTransaction(account: Account) {
    if (this.type === AddTransactionType.ProviderPayOutput) {
      this.transactionInEdition.shortDescription = `Pago a proveedor [${
        this.transactionInEdition.provider.nombre
        }]`
    }
    this.serviceAccount.addTransaction(this.accountKey, this.transactionInEdition)
    this.backToAccounts()
  }
}
