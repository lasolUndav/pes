import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireModule } from 'angularfire2'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'

import { AuthRoutingModule } from './shared/auth-routing.module'
import { AuthService } from './shared/auth.service'
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
    AngularFireAuthModule,
    AuthRoutingModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
