import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseDiagnosisService {
  private parentICD10Codes = new BehaviorSubject<any>(null);
  currentData$ = this.parentICD10Codes.asObservable();
  private baseUrl = environment.baseURL + 'case/diagnosis'
  constructor(private httpClient: HttpClient) { }

  find(term:any){
    var url:string = this.baseUrl + "/find/term/"+ term;
    return this.httpClient.get(url).pipe(tap(data => data))
  }
  updateData(data: any) {
    this.parentICD10Codes.next(data);
  }
}
