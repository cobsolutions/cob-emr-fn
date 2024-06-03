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
export class DotorUserService extends BasePaginationService {
  private baseUrl = environment.baseURL + 'clinical/user'
  constructor(httpClient: HttpClient, loggedInService: LoggedInService) { super(httpClient, loggedInService) }

  getDoctorUser(config$: BehaviorSubject<IApiParams>): Observable<any> {
    return this.get(config$, this.baseUrl + "/find/clinicId/")
  }
  getClinicalUser(clinicId: number, uuid: string) {
    var url = this.baseUrl + '/find/clinicId/' + clinicId + '/uuid/' + uuid
    return this.httpClient.get(url);

  }
  getAllClinicalsUsersByClinic(clinicId: number): Observable<any> {
    var url = this.baseUrl + '/find-all/clinicId/' + clinicId
    return this.httpClient.get(url);
  }
  getAllClinicalsUsers(): Observable<any> {
    var url = this.baseUrl + '/find-all'
    return this.httpClient.get(url);
  }
  deleteDoctor(uuid: string) {
    var url = this.baseUrl + '/delete/uuid/' + uuid
    return this.httpClient.delete(url)
  }
}
