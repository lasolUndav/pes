import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AngularFireModule } from 'angularfire2'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { AuthGuard } from './auth/auth-guard.service'
import { AuthService } from './auth/auth.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FooterComponent } from './layout/footer/footer.component'
import { HeaderComponent } from './layout/header/header.component'
import { LoginComponent } from './login/login.component'
import { MaterialModule } from './material.module'
import { NgModule } from '@angular/core'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { PesAdminModule } from './pes-admin/pes-admin.module'
import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    PesAdminModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
