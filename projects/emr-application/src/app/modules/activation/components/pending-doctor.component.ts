import { Component } from '@angular/core';
import { KcAuthService } from '../../security/service/kc-auth.service';

@Component({
  selector: 'app-pending-doctor',
  templateUrl: './pending-doctor.component.html',
  styleUrls: ['./pending-doctor.component.css']
})
export class PendingDoctorComponent {

  constructor(private kcAuthService: KcAuthService) {}

  logout(): void {
    this.kcAuthService.logout();
  }
}
