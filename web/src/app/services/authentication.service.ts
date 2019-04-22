import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService{
    constructor (private angularFireAuth: AngularFireAuth){

    }
    public SignUp(email: string,password: string){
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password);
    }
}