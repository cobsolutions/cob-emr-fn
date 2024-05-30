import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, map, of, switchMap } from 'rxjs';
import { UserService } from '../../administration/services/user/user.service';
import { RoleScopeRequestBuilder } from '../role.scope.request.build/role.scope.request.builder';

@Injectable({
  providedIn: 'root'
})
export class RoleScopeFinderService {
  private cache = new Map<string, any>();
  uuid: string = '';
  constructor(private userService: UserService, private keycloakAngular: KeycloakService) { }
  public find() {
    const cachedData = this.cache.get(this.uuid);
    console.log(cachedData)
    if (cachedData) {
      return of(cachedData)
    } else {
      return from(this.userService.gteUUID()).pipe(
        map((uuid: any) => {
          console.log(uuid)
          this.uuid = uuid;
          return uuid;
        }),
        switchMap((uuid: string) => {
          var userRole: string[] = this.keycloakAngular.getUserRoles();
          console.log(userRole)
          return this.userService.findUSerRoleScope(uuid, RoleScopeRequestBuilder.builder(userRole))
        }),
        map(data => {
          this.cache.set(this.uuid, data);
          return data;
        })
      )
    }
  }
}
