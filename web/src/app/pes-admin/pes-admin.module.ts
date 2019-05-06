import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PesAdminRoutingModule } from './pes-admin-routing.module'
import { ProvidersComponent } from './providers/providers.component';
import { ProviderComponent } from './provider/provider.component'

@NgModule({
  declarations: [ProvidersComponent, ProviderComponent],
  imports: [CommonModule, PesAdminRoutingModule],
})
export class PesAdminModule {}
