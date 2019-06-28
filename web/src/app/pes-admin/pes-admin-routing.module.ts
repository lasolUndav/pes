import { RouterModule, Routes } from '@angular/router'

import { AgreementComponent } from './agreement/agreement.component'
import { AuthGuard } from '../auth/auth-guard.service'
import { NgModule } from '@angular/core'
import { PesAdminComponent } from './pes-admin.component'
import { ProviderComponent } from './provider/provider.component'
import { ProvidersComponent } from './providers/providers.component'

const routes: Routes = [
  {
    path: '',
    component: PesAdminComponent,
    children: [
      { path: '', redirectTo: 'admin/proveedores', pathMatch: 'full' },
      {
        path: 'admin/convenios',
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
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesAdminRoutingModule {}
