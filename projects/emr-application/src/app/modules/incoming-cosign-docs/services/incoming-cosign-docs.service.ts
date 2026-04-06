import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'projects/emr-application/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncomingCosignDocsService {

  private baseUrl = environment.baseURL + 'medical/note';

  constructor(private httpClient: HttpClient) { }

  getForwardedDocs(providerId: string): Observable<any[]> {
    var url = this.baseUrl + '/forward-info?providerId=' + providerId;
    return this.httpClient.get<any[]>(url);
  }

}
