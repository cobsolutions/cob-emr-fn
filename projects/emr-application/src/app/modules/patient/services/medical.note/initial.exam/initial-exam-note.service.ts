import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { CreateNodeRequest } from '../../../models/medical.note/create.note.request';

@Injectable({
  providedIn: 'root'
})
export class InitialExamNoteService {
  private baseUrl = environment.baseURL + 'medical/note/initial-exam'
  constructor(private httpClient: HttpClient) { }
  create(request: CreateNodeRequest) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl
    return this.httpClient.post(`${url}`, JSON.stringify(request), { 'headers': headers })
  }
  draft() {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl
    return this.httpClient.post(`${url}`, JSON.stringify(null), { 'headers': headers })
  }
  forward() {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl
    return this.httpClient.post(`${url}`, JSON.stringify(null), { 'headers': headers })
  }
  finalize() {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl
    return this.httpClient.post(`${url}`, JSON.stringify(null), { 'headers': headers })
  }
  get(noteId: string) {
    var url = this.baseUrl + '/' + noteId;
    return this.httpClient.get(`${url}`)
  }
  update() {

  }
}
