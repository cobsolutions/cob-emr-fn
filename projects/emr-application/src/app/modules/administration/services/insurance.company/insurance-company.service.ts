import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, map, Observable, retry, switchMap, throwError } from 'rxjs';
import { IApiParams } from '../../../common/interfaces/api.params';
import { PaginationData } from '../../../common/interfaces/pagination.data';
import { ClinicEmittingService } from '../../../common/service/emitting/clinic-emitting.service';
import { IData } from '../../../patient/components/list/interfaces/i.data';
import { LoggedInUser } from '../../../security/model/loggedin.user';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { InsuranceCompany } from '../../model/insurance.company/insurance.company';
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
export class InsuranceCompanyService {
  private baseUrl = environment.baseURL + 'insurance/company'
  constructor(private httpClient: HttpClient, private loggedInService: LoggedInService) { }

  create(insuranceCompany: InsuranceCompany) {
    const headers = { 'content-type': 'application/json' }
    var createURL = environment.baseURL + 'insurance/company/create'
    return this.httpClient.post(`${createURL}`, JSON.stringify(insuranceCompany), { 'headers': headers })
  }
  update(insuranceCompany: InsuranceCompany) {
    const headers = { 'content-type': 'application/json' }
    var createURL = environment.baseURL + 'insurance/company/update'
    return this.httpClient.put(`${createURL}`, JSON.stringify(insuranceCompany), { 'headers': headers })
  }

  delete(id: number) {
    var createURL = environment.baseURL + 'insurance/company/delete/id/' + id
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
          .get<PaginationData>(this.baseUrl + "/find/organization/" + organiationId, options)
      })
    )
  }
  private handleHttpError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
  public findAll(): Observable<any> {
    return this.loggedInService.load().pipe(
      switchMap((loggedInUser: LoggedInUser) => {
        var url = this.baseUrl + '/find/all/organization/' + loggedInUser.organizationId
        return this.httpClient.get<InsuranceCompany[]>(`${url}`, { observe: 'response' });
      })
    )
  }
}
