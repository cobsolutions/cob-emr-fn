import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { Observable } from 'rxjs';
import { SchedulerConfiguration } from '../models/configuration';

@Injectable({
  providedIn: 'root'
})
export class SchedulerConfigurationService {
  private baseUrl = environment.baseURL;
  constructor(private _http: HttpClient) { }
  create(clinicSchedulerConfiguration: SchedulerConfiguration) {
    const createClinicSchedulerConfigurationURL = this.baseUrl + 'scheduler/configuration';
    return this._http.post(createClinicSchedulerConfigurationURL, JSON.stringify(clinicSchedulerConfiguration));
  }

  update(clinicSchedulerConfiguration: SchedulerConfiguration) {
    const createClinicSchedulerConfigurationURL = this.baseUrl + 'scheduler/configuration';
    return this._http.put(createClinicSchedulerConfigurationURL, JSON.stringify(clinicSchedulerConfiguration));
  }

  retrieveCliniSchedulerConfigurationById(id: number): Observable<any> {
    const listClinicSchedulerConfigurationURL = this.baseUrl + 'scheduler/find/clinicId/' + id;
    return this._http.get<SchedulerConfiguration>(listClinicSchedulerConfigurationURL);
  }

  retrieveCliniSchedulerConfigurations(organizationId: number) : Observable<any>{
    const listClinicSchedulerConfigurationURL = this.baseUrl + 'scheduler/find/organizationId/' + organizationId;
    return this._http.get(listClinicSchedulerConfigurationURL);
  }
}
