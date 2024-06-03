import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, catchError, combineLatest, debounceTime, distinctUntilChanged, from, map, Observable, retry, switchMap, throwError } from 'rxjs';
import { IApiParams } from '../../../common/interfaces/api.params';
import { CacheService } from '../../../common/service/cahce/cache.service';
import { IData } from '../../../patient/components/list/interfaces/i.data';
import { Clinic } from '../../../patient/models/clinic';
import { LoggedInUser } from '../../../security/model/loggedin.user';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
const httpOptions = {
  // headers: new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   Connection: 'keep-alive'
  // })
};

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  private userUrl = environment.baseURL + 'clinic'
  constructor(private httpClient: HttpClient, private loggedInService: LoggedInService) { }

  create(clinic: Clinic) {
    const headers = { 'content-type': 'application/json' }
    var createURL = this.userUrl + '/create'
    return this.httpClient.post(`${createURL}`, JSON.stringify(clinic), { 'headers': headers })
  }
  getByUserId(userId: string | undefined) {
    const url = this.userUrl + '/find' + '/user/' + userId;
    return this.httpClient.get(url).pipe(
      map((response: any) => <Clinic[]>response));
  }
  delete(id: number) {
    var createURL = this.userUrl + '/delete/clinic/' + id
    return this.httpClient.delete(`${createURL}`)
  }
  get(config$: BehaviorSubject<IApiParams>): Observable<any> {
    return config$.pipe(
      debounceTime(100),
      distinctUntilChanged(
        (previous, current) => {
          return JSON.stringify(previous) === JSON.stringify(current);
        }
      ),
      switchMap((config) => this.fetchData(config))
    );
  }
  private fetchData(params: IApiParams): Observable<IData> {
    const apiParams = {
      ...params
    };
    const httpParams: HttpParams = new HttpParams({ fromObject: apiParams });

    const options = Object.keys(httpParams).length
      ? { params: httpParams, ...httpOptions }
      : { params: {}, ...httpOptions };
    return this.loggedInService.load().pipe(
      map((loggedInUser: LoggedInUser) => {
        return loggedInUser.organizationId
      })
      , switchMap((organiationId: number) => {
        return this.httpClient
          .get<IData>(this.userUrl + "/find/organization/" + organiationId, options)
      })
    )
  }
  getById(clinicId: number) {
    var createURL = this.userUrl + '/find/' + clinicId
    return this.httpClient.get(`${createURL}`)
  }
  private handleHttpError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  getByOrganizationId(id: number) {
    var createURL = this.userUrl + '/find/organization/' + id;
    return this.httpClient.get(`${createURL}`)
  }
}
