import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApiParams } from '../../../../common/interfaces/api.params';
import { BasePaginationService } from '../../../../common/service/base-pagination.service';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';

@Injectable({
  providedIn: 'root'
})
export class PatientPaymentService extends BasePaginationService {
  private baseUrl = environment.baseURL + 'patient/payment'

  constructor(httpClient: HttpClient, loggedInService: LoggedInService) { super(httpClient, loggedInService) }

  public findPatientPayments(config$: BehaviorSubject<IApiParams>,
    pateintId: number,
    caseId: number,
  ): Observable<any> {
    return this._get(config$, this.baseUrl + '/find/patientId/' + pateintId + '/caseId/' + caseId);
  }

}
