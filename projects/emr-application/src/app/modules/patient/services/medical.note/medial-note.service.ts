import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedialNoteService {
  private baseUrl = environment.baseURL + 'medical/note'
  constructor(private httpClient:HttpClient) { }
  find(section:string){
    var url:string = this.baseUrl + "/find/section/" + section;
    return this.httpClient.get(url);
  }
}
