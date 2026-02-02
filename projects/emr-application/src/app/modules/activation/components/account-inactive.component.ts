import { Component } from '@angular/core';
import { KcAuthService } from '../../security/service/kc-auth.service';

@Component({
  selector: 'app-account-inactive',
  templateUrl: './account-inactive.component.html',
  styleUrls: ['./account-inactive.component.css']
})
export class AccountInactiveComponent {

  constructor(private kcAuthService: KcAuthService) {}

  logout(): void {
    this.kcAuthService.logout();
  }
}
