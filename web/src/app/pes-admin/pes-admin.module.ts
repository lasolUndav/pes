import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireModule } from '@angular/fire'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PesAdminComponent } from './pes-admin.component'
import { PesAdminMaterialModule } from './pes-admin.material.module'
import { PesAdminRoutingModule } from './pes-admin-routing.module'
import { ProviderComponent } from './provider/provider.component'
import { ProvidersComponent } from './providers/providers.component'
import { environment } from '../../environments/environment'

@NgModule({
  declarations: [ProvidersComponent, ProviderComponent, PesAdminComponent],
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
    BrowserModule,
    BrowserAnimationsModule,
  ],
})
export class PesAdminModule {}
