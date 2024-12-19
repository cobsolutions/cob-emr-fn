import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, from, Observable, retry, switchMap, throwError } from 'rxjs';
import { PaginationData } from '../interfaces/pagination.data';

import { IApiParams } from '../interfaces/api.params';
import { CacheService } from './cahce/cache.service';
import { ClinicEmittingService } from './emitting/clinic-emitting.service';
import { LoggedInService } from '../../security/service/loggedIn/logged-in.service';
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
export class BasePaginationService {
  url: string;
  constructor(public httpClient: HttpClient
    , public loggedInService: LoggedInService) { }
  get(config$: BehaviorSubject<IApiParams>, url: string): Observable<any> {
    this.url = url;
    return config$.pipe(
      debounceTime(100),
      distinctUntilChanged(
        (previous, current) => {
          return JSON.stringify(previous) === JSON.stringify(current);
        }
      ),
      switchMap((config) => this.fetchDataWithoutClinic(config,url))
    );
  }
  private fetchData(params: IApiParams): Observable<PaginationData> {
    const apiParams = {
      ...params
    };
    const httpParams: HttpParams = new HttpParams({ fromObject: apiParams });
    const options = Object.keys(httpParams).length
      ? { params: httpParams, ...httpOptions }
      : { params: {}, ...httpOptions };

    return this.loggedInService.selectedClinic$.pipe(
      switchMap(clinicId =>
        this.httpClient
          .get<PaginationData>(this.constructURL(this.url, clinicId), options)
          .pipe(
            retry({ count: 1, delay: 100000, resetOnSuccess: true }),
            catchError(this.handleHttpError)
          )
      ))
  }
  private fetchDataWithoutClinic(params: IApiParams, url: string): Observable<PaginationData> {
    const apiParams = {
      ...params
    };
    const httpParams: HttpParams = new HttpParams({ fromObject: apiParams });
    const options = Object.keys(httpParams).length
      ? { params: httpParams, ...httpOptions }
      : { params: {}, ...httpOptions };
    return this.httpClient
      .get<PaginationData>(url, options)
      .pipe(
        retry({ count: 1, delay: 100000, resetOnSuccess: true }),
        catchError(this.handleHttpError)
      )
  }
  private handleHttpError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
  private constructURL(url: string, clinicId?: number) {
    var urlArr: string[] = url.split('/clinicId/')
    if (urlArr[1] === '') {
      return url + clinicId;
    } else {
      return urlArr[0] + '/clinicId/' + clinicId + urlArr[1]
    }
  }
}
