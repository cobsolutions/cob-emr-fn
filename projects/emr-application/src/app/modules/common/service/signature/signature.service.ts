import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'projects/emr-application/src/environments/environment';
import {
  ConsentAcknowledgment,
  SignatureSubmitRequest,
  SignatureSubmitResponse,
  SignatureTokenValidationResponse
} from '../../models/signature/signature.model';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {

  private baseUrl = environment.baseURL + 'signature';

  constructor(private httpClient: HttpClient) {}

  validateToken(token: string): Observable<SignatureTokenValidationResponse> {
    return this.httpClient.get<SignatureTokenValidationResponse>(
      `${this.baseUrl}/validate-token/${token}`
    );
  }

  submitSignature(request: SignatureSubmitRequest): Observable<SignatureSubmitResponse> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post<SignatureSubmitResponse>(
      `${this.baseUrl}/submit?token=${request.token}`,
      JSON.stringify({ signatureData: request.signatureData, metadata: request.metadata, consent: request.consent }),
      { headers }
    );
  }

  sendOtp(uuid: string, phone: string): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/send-otp`,
      { uuid, phone }
    );
  }

  verifyOtp(uuid: string, code: string, consent: ConsentAcknowledgment): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/verify-otp`,
      { uuid, code, consent }
    );
  }
}
