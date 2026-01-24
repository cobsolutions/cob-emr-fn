import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { CreateQuickDischargeRequest } from '../../../models/medical.note/requester/create.quick.discharge.request';
import { MedicalNoteRequest } from '../../../models/medical.note/medical.note.request';

@Injectable({
  providedIn: 'root'
})
export class QuickDischargeNoteService {
  private baseUrl = environment.baseURL + 'medical/note/quick-discharge'

  constructor(private httpClient: HttpClient) { }

  create(request: CreateQuickDischargeRequest) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl
    return this.httpClient.post(`${url}`, JSON.stringify(request), { 'headers': headers })
  }

  draft(request: MedicalNoteRequest, noteId: string) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/' + noteId + '/draft'
    return this.httpClient.put(`${url}`, JSON.stringify(request), { 'headers': headers })
  }

  finalize(request: MedicalNoteRequest, noteId: string) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/' + noteId + '/finalize'
    return this.httpClient.put(`${url}`, JSON.stringify(request), { 'headers': headers })
  }

  get(noteId: string) {
    var url = this.baseUrl + '/' + noteId;
    return this.httpClient.get(`${url}`)
  }
}
