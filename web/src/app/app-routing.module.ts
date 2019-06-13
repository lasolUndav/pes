import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from './auth/auth-guard.service'
import { LoginComponent } from './login/login.component'
import { NgModule } from '@angular/core'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'admin/proveedores',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
