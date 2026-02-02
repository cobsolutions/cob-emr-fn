import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { map, Observable } from 'rxjs';
import { SignatureAuditRecord, SignatureAuditResponse } from '../models/signature-audit';

@Injectable({
  providedIn: 'root'
})
export class SignatureAuditService {
  private baseUrl = environment.baseURL + 'signature-audit';

  constructor(private httpClient: HttpClient) {}

  findByUser(uuid: string): Observable<SignatureAuditRecord[]> {
    const url = this.baseUrl + '/find/user/' + uuid;
    return this.httpClient.get<SignatureAuditResponse>(url).pipe(
      map(response => response.records || [])
    );
  }
}
