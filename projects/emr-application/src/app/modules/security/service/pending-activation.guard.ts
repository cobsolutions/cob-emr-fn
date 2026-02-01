import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { PendingActivationService } from './pending-activation.service';

@Injectable({
  providedIn: 'root'
})
export class PendingActivationGuard implements CanActivateChild {

  constructor(
    private pendingActivationService: PendingActivationService,
    private router: Router
  ) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // Pending doctor — block everything except the pending-account page
    if (this.pendingActivationService.isPendingDoctorStatus) {
      if (state.url === '/emr/pending-account') {
        return true;
      }
      return this.router.parseUrl('/emr/pending-account');
    }

    // Pending activation (signature via email) — block everything except the info page
    if (this.pendingActivationService.isPending) {
      if (state.url === '/emr/pending-activation') {
        return true;
      }
      return this.router.parseUrl('/emr/pending-activation');
    }

    return true;
  }
}
