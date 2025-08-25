import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OmtTestService {
  private baseUrl = environment.baseURL + '/omt/test'
  constructor(private httpClient: HttpClient) { }

  ueqdTest(answers: any) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/ueqd'
    return this.httpClient.post(`${url}`, JSON.stringify(answers), { 'headers': headers })
  }
}
