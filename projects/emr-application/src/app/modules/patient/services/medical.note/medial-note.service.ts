import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { MedicalNoteRequest } from '../../models/medical.note/medical.note.request';

@Injectable({
  providedIn: 'root'
})
export class MedialNoteService {
  
  private baseUrl = environment.baseURL + 'medical/note'
  private soapBaseUrl = environment.baseURL + 'soap'
  public noteType$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  constructor(private httpClient: HttpClient) { }
  find(section: string) {
    var url: string = this.baseUrl + "/find/section/" + section;
    return this.httpClient.get(url);
  }
  findObjectiveProfile(name: string) {
    var url: string = this.baseUrl + "/find/objective/profile/name/" + name
    return this.httpClient.get(url);
  }
  findSOAPFieldsByProfile(name: string) {
    var url: string = this.soapBaseUrl + "/find/field-name/profile/name/" + name
    return this.httpClient.get(url);
  }

  create(request: MedicalNoteRequest) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/action/create'
    return this.httpClient.post(`${url}`, JSON.stringify(request), { 'headers': headers })
  }
  remove(id: number) {
    var url = this.baseUrl + '/action/delete/id/' + id
    return this.httpClient.delete(`${url}`)
  }
  findMedicalNoteType(id: number) {
    var url = this.baseUrl + '/action/find/id/' + id;
    return this.httpClient.get(`${url}`)
  }
  draft(request: MedicalNoteRequest) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/action/draft'
    return this.httpClient.post(`${url}`, JSON.stringify(request), { 'headers': headers })
  }
  findObjectiveProfiles(): Observable<any> {
    var url: string = this.baseUrl + "/find/objective/profile"
    return this.httpClient.get(url);
  }

  findROMTests(name: string): Observable<any> {
    var url: string = this.baseUrl + "/action/find/rom/name/" + name
    return this.httpClient.get(url);
  }
}
