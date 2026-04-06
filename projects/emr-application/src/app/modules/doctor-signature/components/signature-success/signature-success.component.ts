import { Component, Input } from '@angular/core';
import { KcAuthService } from '../../../security/service/kc-auth.service';

@Component({
  selector: 'app-signature-success',
  templateUrl: './signature-success.component.html',
  styleUrls: ['./signature-success.component.css']
})
export class SignatureSuccessComponent {
  @Input() doctorName = '';

  constructor(private kcAuthService: KcAuthService) {}

  goToLogin(): void {
    this.kcAuthService.logout();
  }
}
