import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms'

import { AuthService } from '../shared/auth.service'
import { Component } from '@angular/core'
import { ErrorStateMatcher } from '@angular/material/core'
import { Router } from '@angular/router'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    )
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  matcher = new MyErrorStateMatcher()
  password: string
  email: string

  constructor(public authService: AuthService, public router: Router) {}

  onLogin(): void {
    console.log(this.email)
    this.authService
      .loginEmailUser(this.email, this.password)
      .then(res => {
        this.onLoginRedirect()
      })
      .catch(err => console.log('err', err.message))
  }

  onLoginRedirect(): void {
    this.router.navigate(['home'])
  }

  logout() {
    this.authService.logout()
  }
}
