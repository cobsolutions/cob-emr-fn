import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';
import { IApiParams } from '../../common/interfaces/api.params';
import { IData } from '../../patient/components/list/interfaces/i.data';
import { LoggedInUser } from '../../security/model/loggedin.user';
import { LoggedInService } from '../../security/service/loggedIn/logged-in.service';
import { ReferringProvider } from '../model/referring.provider';

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
export class ReferringProviderService {
  baseURL: string = environment.baseURL + 'referring/provider'
  constructor(private httpClient: HttpClient
    , private loggedInService: LoggedInService) { }

  create(referringProvider: ReferringProvider) {
    const headers = { 'content-type': 'application/json' }
    var createURL = this.baseURL + '/create'
    return this.httpClient.post(`${createURL}`, JSON.stringify(referringProvider), { 'headers': headers })
  }
  update(referringProvider: ReferringProvider) {
    const headers = { 'content-type': 'application/json' }
    var createURL = this.baseURL + '/update'
    return this.httpClient.put(`${createURL}`, JSON.stringify(referringProvider), { 'headers': headers })
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
    return this.httpClient.get<IData>(this.baseURL + "/find/organizationId/" + this.loggedInService.getLoggedUser().organizationId, options)
  }
}
