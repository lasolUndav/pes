import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserModule } from '@angular/platform-browser'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FooterComponent } from './layout/footer/footer.component'
import { HeaderComponent } from './layout/header/header.component'
import { MaterialModule } from './material.module'
import { NgModule } from '@angular/core'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { PesAdminModule } from './pes-admin/pes-admin.module'

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    PesAdminModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
