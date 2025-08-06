import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakLoginOptions } from 'keycloak-js';

@Component({
  selector: 'app-organization-confirmation',
  templateUrl: './organization-confirmation.component.html',
  styleUrls: ['./organization-confirmation.component.css']
})
export class OrganizationConfirmationComponent implements OnInit {

  constructor(private keycloakAngular: KeycloakService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.keycloakAngular.logout('http://localhost:4300/emr/dashboard');
    }, 1100)
  }
  goHome(){
    var keycloakLoginOptions:KeycloakLoginOptions={
      'redirectUri' :'http://localhost:4300/emr/dashboard'
    }
    this.keycloakAngular.login(keycloakLoginOptions);
  }
}
