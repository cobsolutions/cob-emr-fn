import { Component } from '@angular/core';

@Component({
  selector: 'app-signature-layout',
  templateUrl: './signature-layout.component.html',
  styleUrls: ['./signature-layout.component.css']
})
export class SignatureLayoutComponent {
  currentYear = new Date().getFullYear();
}
