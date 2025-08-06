import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { filter, map, Observable, switchMap } from 'rxjs';
import { User } from '../../../administration/model/user/user';
import { DotorUserService } from '../../../administration/services/user/doctor.user/dotor-user.service';
import { Patient } from '../../../patient/models/patient';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { Appointment } from '../../models/appointment';
import { AppointmentType } from '../../models/appointment.type';
import { AppointmentTypeService } from '../appointment.type/appointment-type.service';
import { PatientAppointmentService } from '../patient-appointment.service';

@Injectable({
  providedIn: 'root'
})
export class InitializeAppointmentService {
  patient$: Observable<Patient[]>;
  therapists$: Observable<User[]>;
  appointmentTypes$: Observable<AppointmentType[]>;
  constructor(private loggedInService: LoggedInService
    , private patientAppointmentService: PatientAppointmentService
    , private clinicalUserService: DotorUserService
    , private appointmnetTypeService: AppointmentTypeService) {

  }
  public findPatients() {
    if (!this.patient$) {
      this.patient$ = this.loggedInService.selectedClinic$.pipe(
        switchMap(clinicId => this.patientAppointmentService.getPateint(clinicId)),
        filter(patients => patients !== null),
        map(response => {
          return response;
        }))
      return this.patient$
    }
    else {
      return this.patient$;
    }
  }
  public findAllTherapists() {
    if (this.therapists$ === undefined) {
      this.therapists$ = this.loggedInService.selectedClinic$.pipe(
        switchMap(clinicId => this.clinicalUserService.getAllClinicalsUsersByClinic(clinicId)),
        filter(therapists => therapists !== null),
        map(response => {
          return response;
        })
      )
      return this.therapists$;
    } else {
      return this.therapists$
    }
  }
  public findTherapists() {
    return this.loggedInService.selectedClinic$.pipe(
      switchMap(clinicId => this.clinicalUserService.getAllClinicalsUsersByClinic(clinicId)),
      filter(therapists => therapists !== null),
      map(response => {
        return response;
      })
    )
  }
  public findAppointmnetType() {
    return this.appointmnetTypeService.retrieveAppointmentTypes().pipe(
      map((response: any) => {
        return response.records;
      }));
  }
  public initializeAppointmentDate(appointment: Appointment, startDate?: Date, appointmentInterval?: number) {
    if (startDate) {
      var startHour = moment(startDate).hour() === 0 ? 8 : moment(startDate).hour();
      appointment.appointmentDate.startDate = startDate;
      appointment.appointmentDate.startTime = moment(startDate).set("hour", startHour).set("minute", 0).toDate();;
      appointment.appointmentDate.endDate = moment(appointment.appointmentDate.startDate).toDate();
      appointment.appointmentDate.endTime = moment(appointment.appointmentDate.startTime).add(appointmentInterval, 'minutes').toDate()
    } else {
      var start: Date = moment.unix(appointment.startDate / 1000).toDate();
      var end: Date = moment.unix(appointment.endDate / 1000).toDate()
      appointment.appointmentDate = {}
      appointment.appointmentDate.startDate = start;
      appointment.appointmentDate.startTime = start;
      appointment.appointmentDate.endDate = end;
      appointment.appointmentDate.endTime = end;;
    }
  }
}
