import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'projects/emr-application/src/environments/environment';
import { IApiParams } from '../../../common/interfaces/api.params';
import { BasePaginationService } from '../../../common/service/base-pagination.service';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulerAuditService extends BasePaginationService {
  private baseUrl = environment.baseURL + 'audit';

  constructor(httpClient: HttpClient, loggedInService: LoggedInService) {
    super(httpClient, loggedInService);
  }

  public findAll(config$: BehaviorSubject<IApiParams>, clinicId: number): Observable<any> {
    return this._get(config$, this.baseUrl + '/clinic/' + clinicId);
  }
}
