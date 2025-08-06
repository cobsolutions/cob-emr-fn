import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { Organization } from '../model/organization';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private baseUrl = environment.baseURL + 'request'
  constructor(private httpClient: HttpClient) { }

  public signup(organization:Organization){
    var url = '/signup'
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/signup'
    return this.httpClient.post(`${url}`, JSON.stringify(organization), { 'headers': headers })

  }
}
