import { BehaviorSubject, Observable } from 'rxjs'

import { Role } from './role.enum'

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  organizationName: string
}

export interface IAuthService {
  authStatus: BehaviorSubject<IAuthStatus>
  login(email: string, password: string): Observable<IAuthStatus>
  logout()
}
