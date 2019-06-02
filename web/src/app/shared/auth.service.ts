import * as firebase from 'firebase/app'

import { AngularFireAuth } from 'angularfire2/auth'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { auth } from 'firebase/app'

@Injectable()
export class AuthService {
  user: Observable<firebase.User>
  isLoggedIn = false
  redirectUrl: string
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState
  }
  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth
        .signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData), err => reject(err))
    })
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
}
