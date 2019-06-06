import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms'

import { AuthService } from '../auth/auth.service'
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
  hide = true
  passFormControl = new FormControl('', [Validators.required])
  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  matcherEmail = new MyErrorStateMatcher()
  matcherPass = new MyErrorStateMatcher()

  password: string
  email: string

  constructor(public authService: AuthService, public router: Router) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
      authStatus => {
        if (authStatus.isAuthenticated) {
          this.onLoginRedirect()
        }
      },
      err => this.onReload()
    )
  }

  onLoginRedirect(): void {
    this.router.navigate(['home'])
  }
  onReload(): void {
    this.router.navigate(['login'])
  }
  logout() {
    this.authService.logout()
  }
}
