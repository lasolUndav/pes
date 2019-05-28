import * as firebase from 'firebase/app'

import { AngularFireAuth } from 'angularfire2/auth'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {
  user: Observable<firebase.User>
  isLoggedIn = false
  redirectUrl: string
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState
  }

  login(email: string, password: string) {
    this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('ok login')
        this.router.navigate(['/admin/proveedores'])
      })
      .catch(err => {
        console.log('Para acceder debe iniciar sesion', err.message)
      })
  }

  logout() {
    this.firebaseAuth.auth.signOut()
  }
}
