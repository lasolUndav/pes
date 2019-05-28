import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router'

import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url

    return this.checkLogin(url)
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state)
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`

    return this.checkLogin(url)
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = ''

    // Navigate to the login page with extras
    this.router.navigate(['/login'])
    return false
  }
}
