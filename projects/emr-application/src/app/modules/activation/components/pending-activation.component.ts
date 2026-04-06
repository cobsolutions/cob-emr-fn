import { Component } from '@angular/core';
import { KcAuthService } from '../../security/service/kc-auth.service';

@Component({
  selector: 'app-pending-activation',
  templateUrl: './pending-activation.component.html',
  styleUrls: ['./pending-activation.component.css']
})
export class PendingActivationComponent {

  constructor(private kcAuthService: KcAuthService) {}

  logout(): void {
    this.kcAuthService.logout();
  }
}
