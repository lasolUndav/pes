import { RouterModule, Routes } from '@angular/router'

import { AccountsComponent } from './accounts/accounts.component'
import { AddTransactionComponent } from './add-transaction/add-transaction.component'
import { AgreementComponent } from './agreement/agreement.component'
import { AgreementsComponent } from './agreements/agreements.component'
import { AuthGuard } from '../auth/auth-guard.service'
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component'
import { NgModule } from '@angular/core'
import { PesAdminComponent } from './pes-admin.component'
import { ProviderComponent } from './provider/provider.component'
import { ProvidersComponent } from './providers/providers.component'
import { ViewsTransactionsComponent } from './views-transactions/views-transactions.component'

const routes: Routes = [
  {
    path: '',
    component: PesAdminComponent,
    children: [
      { path: '', redirectTo: 'admin/proveedores', pathMatch: 'full' },
      {
        path: 'admin/convenios',
        component: AgreementsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/convenio',
        component: AgreementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/proveedores',
        component: ProvidersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/proveedor',
        component: ProviderComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/proveedor/:id',
        component: ProviderComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/covenio/:id',
        component: AgreementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/cuentas',
        component: AccountsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/cuentas/:id',
        component: AccountsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/transacciones',
        component: ViewsTransactionsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/transaccion',
        component: AddTransactionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/editarTransaccion',
        component: EditTransactionComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class PesAdminRoutingModule {}
