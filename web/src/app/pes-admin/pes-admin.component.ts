import { Component, OnInit } from '@angular/core'

import { AuthService } from '../shared/auth.service'
import { LoginComponent } from '../login/login.component'

@Component({
  selector: 'app-pes-admin',
  templateUrl: './pes-admin.component.html',
  styleUrls: ['./pes-admin.component.css'],
})
export class PesAdminComponent implements OnInit {
  constructor(public authService: AuthService) {}

  onLogout() {
    this.authService.logout()
  }
  ngOnInit() {}
}
