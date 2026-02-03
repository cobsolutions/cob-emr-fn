import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApiParams } from '../../../../common/interfaces/api.params';
import { BasePaginationService } from '../../../../common/service/base-pagination.service';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { PatientCasePayment } from '../../../models/chart/patient.payment/patient-case-payment.request';

@Injectable({
  providedIn: 'root'
})
export class PatientPaymentService extends BasePaginationService {
  private baseUrl = environment.baseURL + 'patient/payment'
  private casePaymentUrl = environment.baseURL + 'patient/case/payment'

  constructor(httpClient: HttpClient, loggedInService: LoggedInService) { super(httpClient, loggedInService) }

  public findPatientPayments(config$: BehaviorSubject<IApiParams>,
    pateintId: number,
    caseId: number,
  ): Observable<any> {
    return this._get(config$, this.baseUrl + '/find/patientId/' + pateintId + '/caseId/' + caseId);
  }

  public createCasePayments(caseId: number, payments: PatientCasePayment[]): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post(`${this.casePaymentUrl}/create/caseId/${caseId}`, JSON.stringify(payments), { headers });
  }

  public findCasePayments(caseId: number): Observable<any> {
    return this.httpClient.get(`${this.casePaymentUrl}/find/caseId/${caseId}`);
  }

  public deleteCasePayment(id: number): Observable<any> {
    return this.httpClient.delete(`${this.casePaymentUrl}/delete/${id}`);
  }

}
