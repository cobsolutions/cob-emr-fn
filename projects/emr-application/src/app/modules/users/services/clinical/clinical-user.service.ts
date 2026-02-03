import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../administration/model/user/user';
import { IApiParams } from '../../../common/interfaces/api.params';
import { BasePaginationService } from '../../../common/service/base-pagination.service';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicalUserService extends BasePaginationService  {
  private baseUrl = environment.baseURL + 'clinical/user'
  constructor(httpClient: HttpClient, loggedInService: LoggedInService) {super(httpClient, loggedInService) }
  getDoctorUser(config$: BehaviorSubject<IApiParams>): Observable<any> {
    return this.get(config$, this.baseUrl + "/find/clinicId/")
  }
  getClinicalUser(uuid: string) {
    var url = this.baseUrl + '/find/uuid/' + uuid
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
  getAllClinicalUsersByOrganization(organizationId: number): Observable<any> {
    var url = this.baseUrl + '/find-all/organizationId/' + organizationId;
    return this.httpClient.get(url);
  }
  updateClinicalUser(user: User) {
    const headers = { 'content-type': 'application/json' }
    var createURL = this.baseUrl + '/update'
    return this.httpClient.put(`${createURL}`, JSON.stringify(user), { 'headers': headers })
  }
  deleteDoctor(uuid: string) {
    var url = this.baseUrl + '/delete/uuid/' + uuid
    return this.httpClient.delete(url)
  }
}
