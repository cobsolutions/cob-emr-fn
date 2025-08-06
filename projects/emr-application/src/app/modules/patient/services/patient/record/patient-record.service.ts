import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs';
import { IApiParams } from '../../../../common/interfaces/api.params';
import { BasePaginationService } from '../../../../common/service/base-pagination.service';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { PatientRecordRequest } from '../../../models/patient.record/patient.record.request';

@Injectable({
  providedIn: 'root'
})
export class PatientRecordService extends BasePaginationService {
  private baseUrl = environment.baseURL + 'patient/records'
  constructor(httpClient: HttpClient, loggedInService: LoggedInService) { super(httpClient, loggedInService) }

  find(config$: BehaviorSubject<IApiParams>, patientRecordRequest: PatientRecordRequest): Observable<any> {
    const url = this.baseUrl + '/find';
    return this.loggedInService.selectedClinic$.pipe(
      filter(clinicId => clinicId !== null),
      switchMap((clinicId: any) => {
        patientRecordRequest.clinicId = clinicId;
        return this.post(config$, url, JSON.stringify(patientRecordRequest))
      })
    )
  }
}
