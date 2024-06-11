import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { IApiParams } from '../../../common/interfaces/api.params';
import { Clinic } from '../../../patient/models/clinic';
import { LoggedInUser } from '../../model/loggedin.user';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {
  loggedInUser: LoggedInUser
  clinics: Observable<Clinic[]>;
  private userUrl = environment.baseURL
  public selectedClinic$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  constructor(private keycloakService: KeycloakService, private httpClient: HttpClient) { }
  public loadWithConfiguration(params: IApiParams) {
    return this.load().pipe(
      map((loggedInUser: LoggedInUser) => {
        loggedInUser.params = params;
        return loggedInUser;
      })
    );
  }
  public load() {
    if (this.loggedInUser === undefined) {
      return from(this.keycloakService.getKeycloakInstance().loadUserInfo()).pipe(
        map((userProfile: any) => {
          return this.loggedInUser = {
            uuid: userProfile.sub,
            userName: userProfile.given_name,
            email: userProfile.email
          }
        }),
        switchMap((loggedInUser: LoggedInUser) => {
          return this.getClinics(loggedInUser.uuid)
        })
        , tap((result: Clinic[]) => {
          if (result !== undefined && result.length > 0) {
            this.loggedInUser.organizationId = result[0].organizationId
            this.selectedClinic$.next(Number(result[0].id))
          }
        })
        , map((response: any) => {
          this.loggedInUser.clinics = response;
          return this.loggedInUser;
        })
      )
    } else {
      return of(this.loggedInUser);
    }
  }
  private getClinics(uuid: string) {
    if (!this.clinics) {
      const url = this.userUrl + 'clinic/find' + '/user/' + uuid;
      this.clinics = this.httpClient.get(url).pipe(
        map((response: any) => <Clinic[]>response));
      return this.clinics;
    } else {
      return this.clinics
    }
  }
}
