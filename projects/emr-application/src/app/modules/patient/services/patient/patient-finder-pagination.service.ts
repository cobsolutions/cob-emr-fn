import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, filter, Observable, switchMap } from 'rxjs';
import { IApiParams } from '../../../common/interfaces/api.params';
import { BasePaginationService } from '../../../common/service/base-pagination.service';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';


@Injectable({
  providedIn: 'root'
})
export class PatientFinderPaginationService extends BasePaginationService {

  private baseUrl = environment.baseURL + 'patient'

  constructor(httpClient: HttpClient, loggedInService: LoggedInService) { super(httpClient, loggedInService) }

  searchByName(name: string, clinicId: number): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + '/search/name/' + encodeURIComponent(name) + '/clinic-id/' + clinicId
    );
  }

  getPateints(config$: BehaviorSubject<IApiParams>): Observable<any> {
    return this.get(config$, this.baseUrl + "/find/clinicId/")
  }

  searchPatients(config$: BehaviorSubject<IApiParams>, searchBody$: BehaviorSubject<any>): Observable<any> {
    return combineLatest([config$, searchBody$]).pipe(
      filter(([_, body]) => body !== null),
      debounceTime(100),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      switchMap(([config, body]) => {
        const httpParams = new HttpParams({ fromObject: { ...config } });
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const orgId = this.loggedInService.getLoggedUser().organizationId;
        return this.loggedInService.selectedClinic$.pipe(
          switchMap(clinicId =>
            this.httpClient.post<any>(
              this.baseUrl + '/search/clinic-id/' + clinicId + '/organization-id/' + orgId,
              JSON.stringify(body),
              { params: httpParams, headers }
            )
          )
        );
      })
    );
  }
}
