import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'projects/emr-application/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientChartNoteService {
  private patientCaseUrl = environment.baseURL + 'patient/case'

  constructor(private httpClient: HttpClient) { }

  public saveChartNote(caseId: number, note: string): Observable<any> {
    const url = `${this.patientCaseUrl}/chart-note/${caseId}`;
    return this.httpClient.put(url, note);
  }
}
