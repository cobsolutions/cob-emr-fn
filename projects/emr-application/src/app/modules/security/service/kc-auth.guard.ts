import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { INavData } from '@coreui/angular-pro';
import { MenuItemsConstructor } from '../menu.items.constructor';
import { RenderNavItemsService } from './render-nav-items.service';
import { RoleScopeFinderService } from './role-scope-finder.service';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class KcAuthGuard extends KeycloakAuthGuard {
  constructor(protected override router: Router
    , protected override keycloakAngular: KeycloakService
    , private renderNavItemsService: RenderNavItemsService
    , private roleScopeFinderService: RoleScopeFinderService) {
    super(router, keycloakAngular);
  }
  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (!this.authenticated) {
      await this.keycloakAngular.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    if (!(this.roles.some(role => Role.roles.includes(role)))) {
      this.keycloakAngular.logout();
    }
    var type = route.data['type'];
    if (type === 'requester' && !this.roles.includes(Role.ADMIN_ROLE)) {
      this.keycloakAngular.logout();
    }
    var filteredList: INavData[] = MenuItemsConstructor.construct(this.roles)
    this.renderNavItemsService.renderItems$.next(filteredList)
    this.roleScopeFinderService.find();

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
