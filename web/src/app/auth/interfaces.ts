import { BehaviorSubject, Observable } from 'rxjs'

import { Role } from './role.enum'

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
}

export interface IAuthService {
  authStatus: BehaviorSubject<IAuthStatus>
  login(email: string, password: string): Observable<IAuthStatus>
  logout()
  //getToken(): string
}

export interface IServerAuthResponse {
  accessToken: string
  authStatus: IAuthStatus
}
