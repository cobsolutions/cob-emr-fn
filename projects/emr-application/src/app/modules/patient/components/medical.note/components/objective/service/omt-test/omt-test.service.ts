import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'projects/emr-application/src/environments/environment';

export interface CalculateOMTTestRequest {
  medicalNoteId: string;
  answers: { [key: string]: number | string };
}

@Injectable({
  providedIn: 'root'
})
export class OmtTestService {
  private baseUrl = environment.baseURL + 'medical/note/omt-test'
  constructor(private httpClient: HttpClient) { }

  calculate(testName: string, medicalNoteId: string, answers: { [key: string]: number | string }): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const url = `${this.baseUrl}/${testName}/calculate`;
    const request: CalculateOMTTestRequest = { medicalNoteId, answers };
    return this.httpClient.post(url, request, { headers });
  }

  getAnswers(testName: string, medicalNoteId: string): Observable<any> {
    const url = `${this.baseUrl}/${testName}/score`;
    return this.httpClient.get(url, { params: { medicalNoteId } });
  }
}
