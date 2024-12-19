import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Calendar } from '../../../administration/model/calendar/calendar';
import { IApiParams } from '../../../common/interfaces/api.params';
import { BasePaginationService } from '../../../common/service/base-pagination.service';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarServiceService extends BasePaginationService {
  private baseUrl = environment.baseURL + 'calendar'
  constructor(httpClient: HttpClient, loggedInService: LoggedInService) {
    super(httpClient, loggedInService)
  }

  public findAll(config$: BehaviorSubject<IApiParams>): Observable<any> {
    return this.loggedInService.load().pipe(
      switchMap(user => {
        return this._get(config$, this.baseUrl + "/get/uuid/" + user.uuid)
      })
    )
  }
  public create(model: Calendar) {
    const headers = { 'content-type': 'application/json' }
    const url = this.baseUrl + "/create"
    return this.httpClient.post(`${url}`, JSON.stringify(model), { 'headers': headers })
  }
}
