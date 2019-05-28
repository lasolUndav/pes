import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms'

import { AuthService } from '../shared/auth.service'
import { Component } from '@angular/core'
import { ErrorStateMatcher } from '@angular/material/core'
import { Router } from '@angular/router'

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
  password: string
  email: string
  matcher = new MyErrorStateMatcher()
  constructor(public authService: AuthService, public router: Router) {}

  login() {
    console.log(this.email + '  ' + this.password)
    this.authService.login(this.email, this.password)
    if (this.authService.isLoggedIn) {
      let redirect = this.authService.redirectUrl
        ? this.router.parseUrl(this.authService.redirectUrl)
        : '/home'

      this.router.navigateByUrl(redirect)
    }
    this.email = this.password = ''
  }

  logout() {
    this.authService.logout()
  }
}
