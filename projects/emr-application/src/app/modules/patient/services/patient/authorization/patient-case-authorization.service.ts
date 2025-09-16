import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientCaseAuthorization } from '../../../models/patient.authorization/patient.case.authorization';

@Injectable({
  providedIn: 'root'
})
export class PatientCaseAuthorizationService {
  private baseUrl = '/auth'; 
  constructor(private http: HttpClient) { }
   // 1. List all Auth
   getAll(): Observable<PatientCaseAuthorization[]> {
    return this.http.get<PatientCaseAuthorization[]>(this.baseUrl);
  }

  // 2. Create Auth
  create(auth: PatientCaseAuthorization): Observable<PatientCaseAuthorization> {
    return this.http.post<PatientCaseAuthorization>(this.baseUrl, auth);
  }

  // 3. Update Auth
  update(id: number, auth: PatientCaseAuthorization): Observable<PatientCaseAuthorization> {
    return this.http.put<PatientCaseAuthorization>(`${this.baseUrl}/${id}`, auth);
  }

  // 4. Delete Auth (optional, since you added remove button on FE)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
