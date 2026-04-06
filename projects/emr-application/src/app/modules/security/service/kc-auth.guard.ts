import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EmptyError, firstValueFrom, Observable } from 'rxjs';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { INavData } from '@coreui/angular-pro';
import { MenuItemsConstructor } from '../menu.items.constructor';
import { RenderNavItemsService } from './render-nav-items.service';
import { RoleScopeFinderService } from './role-scope-finder.service';
import { Role } from '../model/role';
import { LoggedInService } from './loggedIn/logged-in.service';
import { EncryptService } from '../../common/service/encyrption/encrypt.service';
import { PendingActivationService } from './pending-activation.service';

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
    , private encryptService: EncryptService
    , private pendingActivationService: PendingActivationService) {
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

    // Await user fetch to ensure status check (403 for pending) happens before navigation
    // Skip for signature page - doctors with pending status need to access it to upload signature
    const isSignaturePage = state.url.startsWith('/emr-signature');

    if (!this.userSubscribed) {
      this.userSubscribed = true;
      // Clear cache to ensure fresh status check from backend
      this.loggedInService.clearCache();
      try {
        const loggedInUser = await firstValueFrom(this.loggedInService.getObservableLoggedUser());
        this.roleScopeFinderService.find();
      } catch (error: any) {
        // Handle errors from user fetch - could be EmptyError (from EMPTY observable) or HTTP errors
        // Allow access to signature page regardless of error - pending doctors need it
        if (isSignaturePage) {
          return true;
        }

        // EmptyError occurs when interceptor returns EMPTY (for 403 responses)
        // Check if pending status was set by interceptor and redirect accordingly
        const isEmptyError = error instanceof EmptyError || error?.name === 'EmptyError';
        const is403Error = error?.status === 403;

        if (isEmptyError || is403Error) {
          if (this.pendingActivationService.isInactive) {
            return this.router.parseUrl('/emr/account-inactive');
          }
          if (this.pendingActivationService.isPendingDoctorStatus) {
            return this.router.parseUrl('/emr/pending-account');
          }
          if (this.pendingActivationService.isPending) {
            return this.router.parseUrl('/emr/pending-activation');
          }
          // If no status set but we got EmptyError/403, something unexpected happened
          if (isEmptyError) {
            console.error('EmptyError but no pending status set');
          }
          return false;
        }
        throw error;
      }
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
