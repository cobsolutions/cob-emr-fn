import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, finalize, from, mergeMap, Observable, throwError } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { KcAuthService } from './kc-auth.service';
import { UserService } from '../../administration/services/user/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService
    , private keycloakAngular: KeycloakService
    , private userService: UserService) { }

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
