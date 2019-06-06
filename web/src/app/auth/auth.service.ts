import * as firebase from 'firebase/app'

import { BehaviorSubject, Observable } from 'rxjs'
import { IAuthService, IAuthStatus, IServerAuthResponse } from './interfaces'

import { AngularFireAuth } from 'angularfire2/auth'
import { CacheService } from './cache.service'
import { Injectable } from '@angular/core'
import { Role } from './role.enum'
import { Router } from '@angular/router'
import { auth } from 'firebase/app'
import { map } from 'rxjs/operators'

export const defaultAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: null,
}

@Injectable()
export class AuthService extends CacheService implements IAuthService {
  user: Observable<firebase.User>
  isLoggedIn = false
  redirectUrl: string
  private readonly authProvider: (
    email: string,
    password: string
  ) => Observable<IServerAuthResponse>

  authStatus = new BehaviorSubject<IAuthStatus>(
    this.getItem('authStatus') || defaultAuthStatus
  )
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    super()
    this.user = firebaseAuth.authState
  }
  login(email: string, pass: string): Observable<IAuthStatus> {
    const loginResponse = this.authProvider(email, pass).pipe(
      map(value => {
        return value.authStatus as IAuthStatus
      })
    )
    loginResponse.subscribe(
      res => {
        this.authStatus.next(res)
      },
      err => {
        this.logout()
      }
    )

    return loginResponse
  }

  logout() {
    this.firebaseAuth.auth.signOut()
  }
}
