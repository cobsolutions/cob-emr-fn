import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class ScopeGuard implements CanActivate {

  constructor(private permissionService: PermissionService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const scopeRole: string = route.data['scopeRole'];
    const requiredScope: string = route.data['requiredScope'];

    if (!scopeRole) {
      return true;
    }

    const allowed = requiredScope === 'modify'
      ? this.permissionService.canModify(scopeRole)
      : this.permissionService.canView(scopeRole);

    if (!allowed) {
      this.router.navigate(['/emr/dashboard']);
      return false;
    }

    return true;
  }
}
