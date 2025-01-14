import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, forkJoin, from, map, Observable, of, ReplaySubject, switchMap, tap } from 'rxjs';
import { UserService } from '../../../administration/services/user/user.service';
import { IApiParams } from '../../../common/interfaces/api.params';
import { Clinic } from '../../../patient/models/clinic';
import { LoggedInUser } from '../../model/loggedin.user';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {
  loggedInUser: LoggedInUser
  public selectedClinic$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public changeSelectedClinic$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  constructor(
    private userService: UserService) { }

  public load(): Observable<any> {
    const uuid = localStorage.getItem('user-uuid');
    if (!this.loggedInUser)
      return this.userService.getLoggedInUser(uuid).pipe(
        tap(loggedInUser => {
          this.loggedInUser = loggedInUser;
        }))
    else
      return of(this.loggedInUser);
  }
}
