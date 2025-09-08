import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalNoteSummaryService {
  private baseUrl = environment.baseURL + 'medical/note/summary'
  constructor(private httpClient: HttpClient) { }

  FindInitialExaminationScore(id:number) {
    var url: string = this.baseUrl + "/find/score/"+id
    return this.httpClient.get(url);
  }

  findInitialExaminationPlanOfCare(id:number) {
    var url: string = this.baseUrl + "/find/plan/"+id
    return this.httpClient.get(url);
  }
  FindInitialExaminationSummary(id:number) {
    var url: string = this.baseUrl + "/find/initial/examination/"+id
    return this.httpClient.get(url);
  }
}
