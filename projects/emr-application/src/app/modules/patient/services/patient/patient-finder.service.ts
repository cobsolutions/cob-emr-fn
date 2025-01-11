import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'lodash';
import { environment } from 'projects/emr-application/src/environments/environment';
import { filter, Observable, switchMap } from 'rxjs';
import { InsuranceCompany } from '../../../administration/model/insurance.company/insurance.company';
import { LoggedInUser } from '../../../security/model/loggedin.user';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { Clinic } from '../../models/clinic';
import { PateintResponse } from '../../models/response/patient.response';

@Injectable({
  providedIn: 'root'
})
export class PatientFinderService {
  private baseUrl = environment.baseURL + 'patient'
  constructor(private httpClient: HttpClient
    , private loggedInService: LoggedInService) { }

  getPatient(patientId: number, clinicId: number) {
    const headers = { 'content-type': 'application/json' }
    var getPatientURL = this.baseUrl + '/find/clinicId/' + clinicId + '/patient/' + patientId
    return this.httpClient.get<PateintResponse>(`${getPatientURL}`, { 'headers': headers },)
  }

  getInsuranceCompaniesForPatient(clinicId: number): Observable<any> {

    var getPatientURL = environment.baseURL + 'insurance/company/find/all/clinicId/' + clinicId
    return this.httpClient.get<InsuranceCompany[]>(`${getPatientURL}`, { observe: 'response' });
  }

  getClinicsForPatient(): Observable<any> {
    return this.loggedInService.load().pipe(
      switchMap((loggedInUser: LoggedInUser) => {
        var getPatientURL = environment.baseURL + 'clinic/find/organization/' + loggedInUser.organizationId
        return this.httpClient.get<Clinic[]>(`${getPatientURL}`, { observe: 'response' });
      })
    )
  }
  getPatientsByName(name: string) {
    return this.loggedInService.selectedClinic$.pipe(
      filter(clinicId => clinicId !== null),
      switchMap((clinicId: any) => {
        var url = this.baseUrl + '/find/name/' + name + '/clinic-id/' + clinicId
        return this.httpClient.get<Clinic[]>(`${url}`, { observe: 'response' });
      })
    )
    // var url = this.baseUrl + '/find/name/' + name ;
    // return this.httpClient.get<Clinic[]>(`${url}`, { observe: 'response' });
  }
}
