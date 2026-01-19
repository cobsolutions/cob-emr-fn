import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'projects/emr-application/src/environments/environment';

export interface CalculateOMTTestRequest {
  answers: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class OmtTestService {
  private baseUrl = environment.baseURL + 'medical/note/omt-test'
  constructor(private httpClient: HttpClient) { }

  calculate(testName: string, answers: { [key: string]: number }): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const url = `${this.baseUrl}/${testName}/calculate`;
    const request: CalculateOMTTestRequest = { answers };
    return this.httpClient.post(url, request, { headers });
  }
}
