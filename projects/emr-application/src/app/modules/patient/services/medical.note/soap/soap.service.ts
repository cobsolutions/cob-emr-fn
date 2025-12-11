import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SoapService {
  private baseUrl = environment.baseURL + 'medical/note/soap'
  constructor(private httpClient: HttpClient) { }
  findSoapFields(section: string, type?: string) {
    var url: string = this.baseUrl + "/section/" + section + "/note-types/" + type +'/fields';
    return this.httpClient.get(url);
  }
}
