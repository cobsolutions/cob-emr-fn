import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FinalizeMedicalNoteRequest } from '../../models/medical.note/finalize.medical.note.request';
import { MedicalNoteRequest } from '../../models/medical.note/medical.note.request';
import { MedicalNoteType } from '../../models/medical.note/medical.note.type';

@Injectable({
  providedIn: 'root'
})
export class MedialNoteService {
  private baseUrl = environment.baseURL + 'medical/note'
  private soapBaseUrl = environment.baseURL + 'soap'
  public medicalNoteType: BehaviorSubject<MedicalNoteType | null> = new BehaviorSubject<MedicalNoteType | null>(null);
  private finalizeSubject = new Subject<boolean>();
  private draftSubject = new Subject<boolean>();
  public medicalNoteID$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  finalize$ = this.finalizeSubject.asObservable();
  draft$ = this.draftSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  notifyFinalize(status: boolean): void {
    this.finalizeSubject.next(status);
  }

  notifyDraft(status: boolean): void {
    this.draftSubject.next(status);
  }
  find(section: string, type?: string) {
    var url: string = this.baseUrl + "/find/section/" + section + "/type/" + type;
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
    var url = this.baseUrl + '/initial-exam'
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
  forward(note: string, uuid: string) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/action/forward/note/' + note + '/uuid/' + uuid;
    return this.httpClient.put(`${url}`, { 'headers': headers })
  }
  finalize(request: MedicalNoteRequest, uuid: string) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/action/finalize/provider/' + uuid
    return this.httpClient.put(`${url}`, JSON.stringify(request), { 'headers': headers })
  }
  finalizea(request: FinalizeMedicalNoteRequest) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/action/finalize'
    return this.httpClient.post(`${url}`, JSON.stringify(request), { 'headers': headers })
  }
}
