import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-organization-confirmation',
  templateUrl: './organization-confirmation.component.html',
  styleUrls: ['./organization-confirmation.component.css']
})
export class OrganizationConfirmationComponent implements OnInit {

  constructor(private keycloakAngular: KeycloakService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.keycloakAngular.logout();
    }, 1100)
  }
  goHome(){
    this.keycloakAngular.login();
  }
}
