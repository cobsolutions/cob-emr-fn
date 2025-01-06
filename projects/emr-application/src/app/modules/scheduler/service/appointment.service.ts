import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/emr-application/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from '../models/appointment';
import { AppointmentFilter } from '../models/appointment.filter';
import { AppointmentType } from '../models/appointment.type';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  public createAppointmentEvent$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private baseUrl = environment.baseURL;
  constructor(private _http: HttpClient) { }
  public appointmnetStartDate$: BehaviorSubject<Date | null> = new BehaviorSubject<Date | null>(null);
  createAppointment(appointment: Appointment) {
    const createAppointmentURL = this.baseUrl + 'appointment/create';
    return this._http.post(createAppointmentURL, appointment);
  }

  retrieveAppointments(startDate: number, endDate: number, clinicId: number, calendarId: number) {
    const listAppointmentURL = this.baseUrl + 'appointment/find/startDate/' + startDate + '/endDate/' + endDate + '/' + clinicId + '/calendarId/' + calendarId;
    return this._http.get(listAppointmentURL);
  }
  retrieveAppointmentsByFilter(startDate: number, endDate: number, clinicId: number, filters: AppointmentFilter) {
    const listAppointmentURL = this.baseUrl + 'appointment/find/filter/' + startDate + '/' + endDate + '/' + clinicId;
    return this._http.post(listAppointmentURL, JSON.stringify(filters));
  }
  updateAppointment(appointment: Appointment) {
    const headers = { 'content-type': 'application/json' }
    const updateAppointmentURL = this.baseUrl + 'appointment/update';
    return this._http.put(updateAppointmentURL, appointment);
  }
  updateAppointmentList(appointment: Appointment) {
    const updateAppointmentURL = this.baseUrl + 'appointment/list';
    return this._http.put(updateAppointmentURL, JSON.stringify(appointment));
  }
  retrieveAppointmentTypes(clinicId: number): Observable<AppointmentType[]> {
    const listAppointmentTypesURL = this.baseUrl + 'appointment/type/find/clinicId/' + clinicId;
    return this._http.get<AppointmentType[]>(listAppointmentTypesURL);
  }
  retrieveAppointment(appointmentId: number): Observable<Appointment> {
    const url = this.baseUrl + 'appointment/find/id/' + appointmentId;
    return this._http.get<Appointment>(url);
  }

  createAppointmentType(type: AppointmentType) {
    const createAppointmentTypURL = this.baseUrl + 'appointment/type';
    return this._http.post(createAppointmentTypURL, JSON.stringify(type, function replacer(key, value) {
      if (this && key === "colorObj")
        return undefined;
      return value;
    }));
  }
  deleteAppointment(id: string | number) {
    const createAppointmentTypURL = this.baseUrl + 'appointment/id/' + id;
    return this._http.delete(createAppointmentTypURL)
  }
  deleteAppointmentList(repeatId: number, clinicId: number) {
    const createAppointmentTypURL = this.baseUrl + 'appointment/list/repeatId/' + repeatId + '/clinicId/' + clinicId;
    return this._http.delete(createAppointmentTypURL)
  }
}
