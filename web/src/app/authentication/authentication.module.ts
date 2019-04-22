import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignupComponent } from './signup/signup.component';
import { AuthenticationService } from '../services/authentication.service';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ],
  providers:[AuthenticationService]
})
export class AuthenticationModule { }
