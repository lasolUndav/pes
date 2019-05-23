import { RouterModule, Routes } from '@angular/router'

import { NgModule } from '@angular/core'
import { PesAdminComponent } from './pes-admin.component'
import { ProviderComponent } from './provider/provider.component'
import { ProvidersComponent } from './providers/providers.component';

const routes: Routes = [
  {
    path: '',
    component: PesAdminComponent,
    children: [
      { path: '', redirectTo: '/admin/providers', pathMatch: 'full' },
      {
        path: 'admin/providers',
        component: ProvidersComponent,
      },
      {
        path: 'admin/provider',
        component: ProviderComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesAdminRoutingModule {}
