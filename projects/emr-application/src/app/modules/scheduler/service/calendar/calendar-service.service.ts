import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Calendar } from '../../../administration/model/calendar/calendar';
import { CalendarsUpdateModel } from '../../../administration/model/calendar/calendar.update.model';
import { IApiParams } from '../../../common/interfaces/api.params';
import { BasePaginationService } from '../../../common/service/base-pagination.service';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarServiceService extends BasePaginationService {
  private baseUrl = environment.baseURL + 'calendarq'
  constructor(httpClient: HttpClient, loggedInService: LoggedInService) {
    super(httpClient, loggedInService)
  }

  public findAll(config$: BehaviorSubject<IApiParams>, clinicId: number): Observable<any> {
    return this._get(config$, this.baseUrl + "/list/clinic-id/" + clinicId + '/user/' + this.loggedInService.getLoggedUser().uuid)
    
  }
  public create(model: Calendar) {
    const headers = { 'content-type': 'application/json' }
    const url = this.baseUrl + "/create"
    return this.loggedInService.selectedClinic$.pipe(
      switchMap(clinicId => {
        model.clinicId = clinicId;
        return this.httpClient.post(`${url}`, JSON.stringify(model), { 'headers': headers })
      })
    )
  }
  public getAttachedCalendars(clinicId: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/get-attached/clinicId/" + clinicId + "/uuid/" + this.loggedInService.getLoggedUser().uuid)
    
  }
  public update(model: CalendarsUpdateModel) {
    const headers = { 'content-type': 'application/json' }
    const url = this.baseUrl + "/update"
    return this.httpClient.put(`${url}`, JSON.stringify(model), { 'headers': headers })
  }
  public updateName(model: Calendar) {
    const headers = { 'content-type': 'application/json' }
    const url = this.baseUrl + "/update/calendar"
    return this.httpClient.put(`${url}`, JSON.stringify(model), { 'headers': headers })
  }
}
