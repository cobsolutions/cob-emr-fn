import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { AdministratorDoctor } from '../models/administrator.doctor';
import { Organization } from '../models/organiztion';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  public adminDoctor$: BehaviorSubject<AdministratorDoctor | null> = new BehaviorSubject<AdministratorDoctor | null>(null);
  private baseUrl = environment.baseURL + 'organization'
  constructor(private httpClient: HttpClient) { }

  getAll() {
    const url = this.baseUrl + '/find'
    return this.httpClient.get(url).pipe(
      map((response: any) => <Organization[]>response));
  }

  getById(organizationId:number){
    var createURL = this.baseUrl + '/find/id/' + organizationId
    return this.httpClient.get(createURL).pipe(
      map((response: any) => <Organization>response.records));
  }

  create(organization: Organization) {
    const createFollowupURL = this.baseUrl + '/create'
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(`${createFollowupURL}`, JSON.stringify(organization), { 'headers': headers, observe: 'response' })
  }
  update(organization: Organization) {
    const createFollowupURL = this.baseUrl + '/update'
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.put(`${createFollowupURL}`, JSON.stringify(organization), { 'headers': headers, observe: 'response' })
  }
}
