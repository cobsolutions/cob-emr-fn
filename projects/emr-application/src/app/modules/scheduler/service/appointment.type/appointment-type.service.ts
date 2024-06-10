import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { Observable } from 'rxjs';
import { AppointmentType } from '../../models/appointment.type';

@Injectable({
  providedIn: 'root'
})
export class AppointmentTypeService {

  constructor(private _http: HttpClient) { }
  private baseUrl = environment.baseURL + 'appointment/type/';
  public create(appointmentType: AppointmentType) {
    const url = this.baseUrl + 'create';
    return this._http.post(url, appointmentType);
  }
  retrieveAppointmentTypes(clinicId: number) {
    const url = this.baseUrl + 'find/clinic/' + clinicId;
    return this._http.get(url);
  }
}
