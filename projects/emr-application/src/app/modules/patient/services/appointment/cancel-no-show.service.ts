import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { IApiParams } from '../../../common/interfaces/api.params';
import { BasePaginationService } from '../../../common/service/base-pagination.service';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';


@Injectable({
  providedIn: 'root'
})
export class CancelNoShowService extends BasePaginationService {

  private baseUrl = environment.baseURL + 'appointment/chart/cno/find/cancel/noshow'
  constructor(httpClient: HttpClient,loggedInService: LoggedInService) { super(httpClient,loggedInService) }

  public findCancelNoShowAppointments(config$: BehaviorSubject<IApiParams>,
    pateintId: number,
    caseId: number) {
    return this.get(config$, this.baseUrl + '/patientId/' + pateintId + '/clinicId/'  + '/patientCaseId/' + caseId)
  }
}
