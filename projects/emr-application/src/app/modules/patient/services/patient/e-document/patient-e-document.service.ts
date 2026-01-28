import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApiParams } from '../../../../common/interfaces/api.params';
import { BasePaginationService } from '../../../../common/service/base-pagination.service';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';

export interface EDocumentUploadRequest {
  documentType: string;
  nameOfDocument: string;
  dateOfReceipt: Date;
  assignedCase: string;
  patientId: number;
  caseId: string;
  file: File;
}

export interface EDocumentResponse {
  id: number;
  documentType: string;
  nameOfDocument: string;
  dateOfReceipt: Date;
  assignedCase: string;
  fileName: string;
  fileUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PatientEDocumentService extends BasePaginationService {
  private baseUrl = environment.baseURL + 'patient/e-document';

  constructor(httpClient: HttpClient, loggedInService: LoggedInService) {
    super(httpClient, loggedInService);
  }

  /**
   * Upload a new e-document
   */
  upload(request: EDocumentUploadRequest): Observable<EDocumentResponse> {
    const formData = new FormData();
    formData.append('file', request.file, request.file.name);
    formData.append('documentType', request.documentType);
    formData.append('nameOfDocument', request.nameOfDocument);
    formData.append('dateOfReceipt', request.dateOfReceipt.toString());
    formData.append('assignedCase', request.assignedCase);
    formData.append('patientId', request.patientId.toString());
    formData.append('caseId', request.caseId);

    return this.httpClient.post<EDocumentResponse>(this.baseUrl + '/upload', formData);
  }

  /**
   * Upload with progress tracking
   */
  uploadWithProgress(request: EDocumentUploadRequest): Observable<HttpEvent<EDocumentResponse>> {
    const formData = new FormData();
    formData.append('file', request.file, request.file.name);
    formData.append('documentType', request.documentType);
    formData.append('nameOfDocument', request.nameOfDocument);
    formData.append('dateOfReceipt', request.dateOfReceipt.toString());
    formData.append('assignedCase', request.assignedCase);
    formData.append('patientId', request.patientId.toString());
    formData.append('caseId', request.caseId);

    return this.httpClient.post<EDocumentResponse>(this.baseUrl + '/upload', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  /**
   * Find e-documents for a patient case
   */
  findByPatientCase(
    config$: BehaviorSubject<IApiParams>,
    patientId: number,
    caseId: string
  ): Observable<any> {
    return this._get(config$, `${this.baseUrl}/find/patientId/${patientId}/caseId/${caseId}`);
  }

  /**
   * Find all e-documents for a patient (across all cases)
   */
  findByPatient(
    config$: BehaviorSubject<IApiParams>,
    patientId: number
  ): Observable<any> {
    return this._get(config$, `${this.baseUrl}/find/patientId/${patientId}`);
  }

  /**
   * Get a single e-document by ID
   */
  getById(documentId: number): Observable<EDocumentResponse> {
    return this.httpClient.get<EDocumentResponse>(`${this.baseUrl}/${documentId}`);
  }

  /**
   * Download an e-document
   */
  download(documentId: number): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/download/${documentId}`, {
      responseType: 'blob'
    });
  }

  /**
   * Delete an e-document
   */
  delete(documentId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${documentId}`);
  }

  /**
   * Update e-document metadata (not the file)
   */
  update(documentId: number, request: Partial<EDocumentUploadRequest>): Observable<EDocumentResponse> {
    return this.httpClient.put<EDocumentResponse>(`${this.baseUrl}/${documentId}`, request);
  }
}
