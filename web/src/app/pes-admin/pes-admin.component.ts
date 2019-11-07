import { Component, OnInit } from '@angular/core'

import { AuthService } from '../auth/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-pes-admin',
  templateUrl: './pes-admin.component.html',
  styleUrls: ['./pes-admin.component.css'],
})
export class PesAdminComponent implements OnInit {
  siteMapLabel: string
  constructor(public authService: AuthService, public router: Router) {
    this.siteMapLabel = 'Administración/proveedores'
  }

  changeSiteMapLabel(page) {
    this.siteMapLabel = `Administración/${page}`
  }

  ngOnInit() {}
  logout() {
    this.authService.logout()
    this.router.navigate(['login'])
  }
}
