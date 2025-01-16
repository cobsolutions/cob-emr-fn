import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KcAuthService {

  constructor(private keycloakService: KeycloakService) {}
  public getLoggedUser(): KeycloakTokenParsed | undefined {
    try {
      const userDetails: KeycloakTokenParsed | undefined = this.keycloakService.getKeycloakInstance()
        .idTokenParsed;
      return userDetails;
    } catch (e) {
      console.error("Exception", e);
      return undefined;
    }
  }
  public isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  public loadUserProfile(): Promise<KeycloakProfile> {
    return this.keycloakService.loadUserProfile();
  }

  public login(): void {
    localStorage.removeItem('access-token')
    this.keycloakService.login();
  }

  public logout(): void {
    localStorage.removeItem('LOGGEDINUSR')
    localStorage.removeItem('access-token')
    localStorage.removeItem('org');
    this.keycloakService.logout(window.location.origin);
  }

  public redirectToProfile(): void {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  public getRoles(): string[] {
    return this.keycloakService.getUserRoles(false);
  }

  public isUserInRole(role: string): boolean {
    return this.keycloakService.isUserInRole(role);
  }
  public getToken(): Promise<string> {
    return this.keycloakService.getToken()
  }
  public updateToken(minValidity: number): Promise<boolean> {
    return this.keycloakService.updateToken(minValidity);
  }
  public isTokenExpired(): boolean {
    return this.keycloakService.isTokenExpired();
  }
  public shouldUpdateToken(request: HttpRequest<unknown>) {
    return this.keycloakService.shouldAddToken(request);
  }
}
