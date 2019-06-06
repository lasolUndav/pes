import { Component, OnInit } from '@angular/core'

import { AuthService } from '../auth/auth.service'

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
