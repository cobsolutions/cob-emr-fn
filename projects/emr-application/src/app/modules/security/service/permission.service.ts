import { Injectable } from '@angular/core';
import { UserRoleScope } from '../../administration/model/user/user.role.scope';
import { LoggedInService } from './loggedIn/logged-in.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private loggedInService: LoggedInService) { }

  getScope(role: string): string {
    const userRoleScopes: UserRoleScope[] = this.loggedInService.getLoggedUser().userRoleScope || [];
    const match = userRoleScopes.find(urs => urs.role === role);
    return match ? match.scope : 'hidden';
  }

  canView(role: string): boolean {
    const scope = this.getScope(role);
    return scope === 'view' || scope === 'modify';
  }

  canModify(role: string): boolean {
    return this.getScope(role) === 'modify';
  }

  isHidden(role: string): boolean {
    return this.getScope(role) === 'hidden';
  }
}
