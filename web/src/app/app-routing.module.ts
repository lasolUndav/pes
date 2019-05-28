import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from './shared/auth.guard'
import { LoginComponent } from './login/login.component'
import { NgModule } from '@angular/core'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    redirectTo: 'admin/proveedores',
    pathMatch: 'full',
    canLoad: [AuthGuard],
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
