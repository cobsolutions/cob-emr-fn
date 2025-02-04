import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { Observable } from 'rxjs';
import { SchedulerUserSettings } from '../model/scheduler.user.settings';
import { SchedulerSettings } from '../model/shceduler.date.settings';
import { PatientCancellationFee } from '../models/cancellation.fee/cancellation.fee';
import { SchedulerConfiguration } from '../models/configuration';

@Injectable({
  providedIn: 'root'
})
export class SchedulerConfigurationService {
  private baseUrl = environment.baseURL;
  constructor(private _http: HttpClient) { }
  create(clinicSchedulerConfiguration: SchedulerConfiguration) {
    const headers = { 'content-type': 'application/json' }
    const createClinicSchedulerConfigurationURL = this.baseUrl + 'scheduler/create/configuration';
    return this._http.post(createClinicSchedulerConfigurationURL, JSON.stringify(clinicSchedulerConfiguration), { 'headers': headers });
  }

  update(clinicSchedulerConfiguration: SchedulerConfiguration) {
    const createClinicSchedulerConfigurationURL = this.baseUrl + 'scheduler/configuration';
    return this._http.put(createClinicSchedulerConfigurationURL, JSON.stringify(clinicSchedulerConfiguration));
  }

  retrieveCliniSchedulerConfigurationById(id: number): Observable<any> {
    const listClinicSchedulerConfigurationURL = this.baseUrl + 'scheduler/find/clinicId/' + id;
    return this._http.get<SchedulerConfiguration>(listClinicSchedulerConfigurationURL);
  }

  retrieveCliniSchedulerConfigurations(organizationId: number): Observable<any> {
    const listClinicSchedulerConfigurationURL = this.baseUrl + 'scheduler/find/organizationId/' + organizationId;
    return this._http.get(listClinicSchedulerConfigurationURL);
  }

  findNotConfigurlableClinics(organizationId: number): Observable<any> {
    const listClinicSchedulerConfigurationURL = this.baseUrl + 'clinic/find-not-configurable/organization/' + organizationId;
    return this._http.get(listClinicSchedulerConfigurationURL);
  }

  createSettings(settings: SchedulerSettings) {
    const headers = { 'content-type': 'application/json' }
    const url = this.baseUrl + 'scheduler/create/settings';
    return this._http.post(url, JSON.stringify(settings), { 'headers': headers });
  }
  findSettings(clinicId: number) {
    const url = this.baseUrl + 'scheduler/find/settings/clinicId/' + clinicId;
    return this._http.get(url);
  }

  updateSchedulerUserSettings(schedulerUserSettings:SchedulerUserSettings) {
    const headers = { 'content-type': 'application/json' }
    const url = this.baseUrl + 'scheduler/update/selected-calendars';
    return this._http.put(url, JSON.stringify(schedulerUserSettings), { 'headers': headers });
  }
  findCalendarsBySchedulerUserSettings(clinicId:number , user:string){
    const url = this.baseUrl + 'scheduler/find/saved-calendars/clinicId/'+clinicId+'/user/'+user;
    return this._http.get(url);
  }
  createCancelFee(patientCancellationFee:PatientCancellationFee){
    const headers = { 'content-type': 'application/json' }
    const url = this.baseUrl + 'patient/cancellation/fee/create';
    return this._http.post(url, JSON.stringify(patientCancellationFee), { 'headers': headers });
  }
}
