import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireModule } from 'angularfire2'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { ConfirmDeleteProviderComponent } from './providers/confirm-delete-provider/confirm-delete-provider.component'
import { ConfirmUpdateProviderComponent } from './provider/confirm-update-provider/confirm-update-provider.component'
import { FlexLayoutModule } from '@angular/flex-layout'
import { NgModule } from '@angular/core'
import { PesAdminComponent } from './pes-admin.component'
import { PesAdminMaterialModule } from './pes-admin.material.module'
import { PesAdminRoutingModule } from './pes-admin-routing.module'
import { ProviderComponent } from './provider/provider.component'
import { ProviderDetailComponent } from './providers/provider-detail/provider-detail.component'
import { ProvidersComponent } from './providers/providers.component'
import { environment } from '../../environments/environment'

@NgModule({
  declarations: [
    ProvidersComponent,
    ProviderComponent,
    PesAdminComponent,
    ConfirmDeleteProviderComponent,
    ConfirmUpdateProviderComponent,
    ProviderDetailComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    PesAdminRoutingModule,
    PesAdminMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FlexLayoutModule,
  ],
<<<<<<< HEAD
  entryComponents: [ConfirmDeleteProviderComponent, ConfirmUpdateProviderComponent],
=======
  entryComponents: [ConfirmDeleteProviderComponent, ProviderDetailComponent],
>>>>>>> 87c5acdd6c602ceaa93b35cf945465473c6c9917
})
export class PesAdminModule {}
