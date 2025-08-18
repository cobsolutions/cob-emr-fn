import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, map, of, switchMap } from 'rxjs';
import { UserService } from '../../administration/services/user/user.service';
import { RoleScopeRequestBuilder } from '../role.scope.request.build/role.scope.request.builder';
import { LoggedInService } from './loggedIn/logged-in.service';

@Injectable({
  providedIn: 'root'
})
export class RoleScopeFinderService {
  private cache = new Map<string, any>();
  uuid: string = '';
  constructor(private userService: UserService, private keycloakAngular: KeycloakService, private loggedInService: LoggedInService) { }
  public find() {
    const cachedData = this.cache.get(this.uuid);
    if (cachedData) {
      return of(cachedData)
    } else {
      var userRole: string[] = this.keycloakAngular.getUserRoles();
      return this.userService.findUSerRoleScope(this.loggedInService.getLoggedUser().uuid, RoleScopeRequestBuilder.builder(userRole)).pipe(
        map(data => {
          this.cache.set(this.uuid, data);
          return data;
        })
      )

    }
  }
}
