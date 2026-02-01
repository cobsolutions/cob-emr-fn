import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, EMPTY, finalize, from, mergeMap, Observable, throwError } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../administration/services/user/user.service';
import { PendingActivationService } from './pending-activation.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService
    , private keycloakAngular: KeycloakService
    , private userService: UserService
    , private pendingActivationService: PendingActivationService
    , private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show();
    return from(this.userService.getAccessToken())
      .pipe(
        mergeMap(token => {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
          return next.handle(request);
        }
        ),
        finalize(() => {
          this.spinner.hide();
        }),
        catchError(error => {
          console.log(JSON.stringify(error))
          this.spinner.hide();

          // Handle 403 FORBIDDEN responses
          if (error.status === 403 && error.error?.errorCode === 'FORBIDDEN') {
            const message: string = error.error?.message || '';

            // Case 1: Pending activation — signature required (sent by email)
            if (message.includes('pending activation')) {
              if (this.pendingActivationService.isPending) return EMPTY;
              this.pendingActivationService.setPendingActivation();
              this.router.navigate(['/emr/pending-activation']);
              return EMPTY;
            }

            // Case 2: Pending doctor — account data incomplete
            if (message.includes('account is pending')) {
              if (this.pendingActivationService.isPendingDoctorStatus) return EMPTY;
              this.pendingActivationService.setPendingDoctor();
              this.router.navigate(['/emr/pending-account']);
              return EMPTY;
            }
          }

          if (error.status === 401) {
            this.keycloakAngular.logout();
          }
          if (error.error.errorCode === 'UNAUTHORIZED') {
            this.keycloakAngular.logout();
          } else {
            return throwError(error);
          }
          return [];
        }))
  }
}
