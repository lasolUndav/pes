import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AuthService } from '../auth/auth.service'
import { Router } from '@angular/router'

export const OptionalTextValidation = [Validators.minLength(2), Validators.maxLength(50)]
export const RequiredTextValidation = OptionalTextValidation.concat([Validators.required])
export const EmailValidation = [Validators.required, Validators.email]
export const PasswordValidation = [Validators.required]

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loginErrorMessage = ''
  loginErrorHelpMessage = ''

  constructor(
    public authService: AuthService,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildLoginForm()
  }

  login(submittedForm: FormGroup): void {
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .subscribe(
        authStatus => {
          if (authStatus.isAuthenticated) {
            this.router.navigate(['home'])
          } else {
            this.loginErrorMessage = `Credenciales no reconocidas :(`
            this.loginErrorHelpMessage = `Intenta de nuevo`
          }
        },
        err => {
          console.log('error en el servidor', err)
          this.loginErrorMessage = 'Error en el servidor'
          this.loginErrorHelpMessage = `Podes contactarnos en lasol@undav.edu.ar`
        }
      )
  }

  logout() {
    this.authService.logout()
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    })
  }
}
