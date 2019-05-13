import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireModule } from '@angular/fire'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserModule } from '@angular/platform-browser'
import { MaterialModule } from './material.module'
import { NgModule } from '@angular/core'
import { PesAdminModule } from './pes-admin/pes-admin.module'
import { ProvidersComponent } from './pes-admin/providers/providers.component'
import { environment } from '../environments/environment'

@NgModule({
  declarations: [AppComponent, ProvidersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    PesAdminModule,
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent],
})
export class AppModule {}
