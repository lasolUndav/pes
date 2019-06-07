import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  RouterStateSnapshot,
} from '@angular/router'

import { AuthService } from './auth.service'
import { IAuthStatus } from './interfaces'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Route } from '@angular/compiler/src/core'

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  protected currentAuthStatus: IAuthStatus
  constructor(protected authService: AuthService, protected router: Router) {
    this.authService.authStatus.subscribe(
      authStatus => (this.currentAuthStatus = authStatus)
    )
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin()
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(route)
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(childRoute)
  }

  protected checkLogin(route?: ActivatedRouteSnapshot) {
    let params: any
    if (route) {
      params = { redirectUrl: route.pathFromRoot.map(r => r.url).join('/') }
    }

    if (!this.currentAuthStatus.isAuthenticated) {
      this.showAlert(this.currentAuthStatus.isAuthenticated)
      this.router.navigate(['login'])
      return false
    }

    return true
  }

  private showAlert(isAuth: boolean) {
    if (!isAuth) {
      console.log('You must login to continue')
    }
  }
}
