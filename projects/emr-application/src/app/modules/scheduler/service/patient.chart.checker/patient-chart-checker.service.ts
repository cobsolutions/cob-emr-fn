import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { Observable } from 'rxjs';
import { PatientChartAccessibilityModelRequest } from '../../model/patient.chart.accessibility.model.request';

@Injectable({
  providedIn: 'root'
})
export class PatientChartCheckerService {
  private baseUrl = environment.baseURL + 'patient'
  constructor(private httpClient: HttpClient) { }

  public check(model: PatientChartAccessibilityModelRequest):Observable<any> {
    const headers = { 'content-type': 'application/json' }
    var url: string = this.baseUrl + '/check/chart/accessibility';
    return this.httpClient.post(url, JSON.stringify(model), { 'headers': headers });

  }
}
