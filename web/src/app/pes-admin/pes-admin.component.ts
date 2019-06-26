import { Component, OnInit } from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-pes-admin',
  templateUrl: './pes-admin.component.html',
  styleUrls: ['./pes-admin.component.css'],
})
export class PesAdminComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {}
  logout() {
    this.authService.logout()
    this.router.navigate(['login'])
  }
}
