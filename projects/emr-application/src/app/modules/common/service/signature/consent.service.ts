import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'projects/emr-application/src/environments/environment';
import { ConsentTextResponse } from '../../models/signature/signature.model';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  private baseUrl = environment.baseURL + 'signature/consent';

  constructor(private httpClient: HttpClient) {}

  getCurrentConsentText(): Observable<ConsentTextResponse> {
    return this.httpClient.get<ConsentTextResponse>(`${this.baseUrl}/current`);
  }
}
