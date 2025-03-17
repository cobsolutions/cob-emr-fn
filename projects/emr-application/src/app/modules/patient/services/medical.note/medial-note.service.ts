import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { MedicalNoteRequest } from '../../models/medical.note/medical.note.request';

@Injectable({
  providedIn: 'root'
})
export class MedialNoteService {
  private baseUrl = environment.baseURL + 'medical/note'
  constructor(private httpClient: HttpClient) { }
  find(section: string) {
    var url: string = this.baseUrl + "/find/section/" + section;
    return this.httpClient.get(url);
  }

  create(request: MedicalNoteRequest) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create'
    return this.httpClient.post(`${url}`, JSON.stringify(request), { 'headers': headers })
  }
}
