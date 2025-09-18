import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { Observable } from 'rxjs';
import { PatientCaseAuthorization } from '../../../models/patient.authorization/patient.case.authorization';

@Injectable({
  providedIn: 'root'
})
export class PatientCaseAuthorizationService {
  private baseUrl = environment.baseURL + 'auths';
  constructor(private http: HttpClient) { }
  /**
   * Save or update a list of authorizations.
   * - New items (id == null) will be created
   * - Existing items (id != null) will be updated
   */
  saveOrUpdate(auths: PatientCaseAuthorization[], patientCaseId: number): Observable<PatientCaseAuthorization[]> {
    return this.http.post<PatientCaseAuthorization[]>(this.baseUrl + "/case/" + patientCaseId, auths);
  }

  /**
   * Fetch all authorizations
   */
  list(patientCaseId: number): Observable<PatientCaseAuthorization[]> {
    return this.http.get<PatientCaseAuthorization[]>(this.baseUrl + "/case/" + patientCaseId);
  }
}
