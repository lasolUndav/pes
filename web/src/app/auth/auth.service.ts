import * as firebase from 'firebase/app'

import { BehaviorSubject, Observable, from } from 'rxjs'
import { IAuthService, IAuthStatus, IServerAuthResponse } from './interfaces'

import { AngularFireAuth } from 'angularfire2/auth'
import { CacheService } from './cache.service'
import { Injectable } from '@angular/core'
import { Role } from './role.enum'
import { Router } from '@angular/router'
import { auth } from 'firebase/app'

export const defaultAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: null,
}

@Injectable()
export class AuthService extends CacheService implements IAuthService {
  private readonly authProvider: (
    email: string,
    password: string
  ) => Observable<IServerAuthResponse>

  authStatus = new BehaviorSubject<IAuthStatus>(
    this.getItem('authStatus') || defaultAuthStatus
  )
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    super()
  }
  login(email: string, pass: string): Observable<IAuthStatus> {
    return from(<Promise<any>>(
      this.firebaseAuth.auth.signInWithEmailAndPassword(email, pass).then(
        value => {
          console.log(value)
          this.setItem('authStatus', { isAuthenticated: true })
          return { isAuthenticated: true } as IAuthStatus
        },
        err => this.onError(err)
      )
    ))
  }
  loginGoogleUser() {
    return new Promise((resolve, reject) => {
      const user_login = new firebase.auth.GoogleAuthProvider()
      this.firebaseAuth.auth
        .signInWithPopup(user_login)
        .then(userData => resolve(userData), err => reject(err))
    })
  }
  logout() {
    this.firebaseAuth.auth.signOut()
    this.router.navigate(['login'])
  }
  onError(err) {
    console.log('fallo el login')
    this.setItem('AuthStatus', { isAuthenticated: false })
  }
}
