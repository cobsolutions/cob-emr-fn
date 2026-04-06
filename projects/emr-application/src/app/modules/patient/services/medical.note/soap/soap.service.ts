import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { Observable } from 'rxjs';

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
  public findNoteObjectiveProfiles():Observable<any> {
    var url = this.baseUrl +'/find/objective/profile'
    return this.httpClient.get(`${url}`)
  }
  public findSOAPFieldsByProfile(profileName:string):Observable<any> {
    var url = this.baseUrl +'/find/field-name/profile/name/' + profileName;
    return this.httpClient.get(`${url}`)
  }
}
