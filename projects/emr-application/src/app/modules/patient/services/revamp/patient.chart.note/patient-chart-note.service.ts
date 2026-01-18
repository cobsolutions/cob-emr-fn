import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientChartNoteService {
  private baseUrl = environment.baseURL + 'patient-chart-note'
  constructor(private httpClient: HttpClient) { }
  public find(patientCaseId:string){
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/find/actions/case-id/' +patientCaseId;
    return this.httpClient.get(`${url}`)
  }
}
