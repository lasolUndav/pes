import { AuthService } from './auth/auth.service'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet> </router-outlet>
    <app-footer></app-footer>
  `,
})
export class AppComponent {
  title = 'pes'
  constructor(public authService: AuthService, router: Router) {}
}
