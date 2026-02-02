import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { INavData } from '@coreui/angular-pro';
import { MenuItemsConstructor } from '../menu.items.constructor';
import { RenderNavItemsService } from './render-nav-items.service';
import { RoleScopeFinderService } from './role-scope-finder.service';
import { Role } from '../model/role';
import { LoggedInService } from './loggedIn/logged-in.service';
import { EncryptService } from '../../common/service/encyrption/encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class KcAuthGuard extends KeycloakAuthGuard {
  private initialized = false;
  private userSubscribed = false;

  constructor(protected override router: Router
    , protected override keycloakAngular: KeycloakService
    , private renderNavItemsService: RenderNavItemsService
    , private roleScopeFinderService: RoleScopeFinderService
    , private loggedInService: LoggedInService
    , private encryptService: EncryptService) {
    super(router, keycloakAngular);
  }

  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (!this.authenticated) {
      await this.keycloakAngular.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    var type = route.data['type'];
    if (type === 'requester' && !this.roles.includes(Role.ORGANIZATION_REQUEST_ROLE)) {
      this.keycloakAngular.logout();
    }

    // Only initialize menu items once per session
    if (!this.initialized) {
      var filteredList: INavData[] = MenuItemsConstructor.construct(this.roles);
      this.renderNavItemsService.renderItems$.next(filteredList);
      this.initialized = true;
    }

    // Only subscribe to user once
    if (!this.userSubscribed) {
      this.userSubscribed = true;
      this.loggedInService.getObservableLoggedUser().subscribe((loggedInUser: any) => {
        this.roleScopeFinderService.find();
      });
    }

    // Handle default redirect based on role
    const defaultRedirect = route.data['defaultRedirect'];
    if (defaultRedirect) {
      const isAdmin = this.roles.includes(Role.ADMIN_ROLE);
      const redirectUrl = isAdmin
        ? (route.data['adminRedirect'] || '/emr/organization/list')
        : (route.data['normalRedirect'] || '/emr/dashboard');
      return this.router.parseUrl(redirectUrl);
    }

    // Check for excluded roles first
    const excludeRoles = route.data['excludeRoles'];
    if (excludeRoles instanceof Array && excludeRoles.length > 0) {
      const hasExcludedRole = excludeRoles.some(role => this.roles.includes(role));
      if (hasExcludedRole) {
        // Redirect to a default page for excluded users
        const redirectUrl = route.data['excludeRedirect'] || '/emr/organization/list';
        return this.router.parseUrl(redirectUrl);
      }
    }

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];
    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    var valid = false;
    for (let i = 0; i < requiredRoles.length; i++) {
      valid = this.roles.includes(requiredRoles[i]);
      if (valid)
        break;
    }
    return valid;
  }
}
