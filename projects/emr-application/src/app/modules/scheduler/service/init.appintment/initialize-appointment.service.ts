import { Injectable } from '@angular/core';
import { String } from 'lodash';
import * as moment from 'moment';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { User } from '../../../administration/model/user/user';
import { DotorUserService } from '../../../administration/services/user/doctor.user/dotor-user.service';
import { Patient } from '../../../patient/models/patient';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { Appointment } from '../../models/appointment';
import { PatientAppointmentService } from '../patient-appointment.service';

@Injectable({
  providedIn: 'root'
})
export class InitializeAppointmentService {
  constructor(private loggedInService: LoggedInService
    , private patientAppointmentService: PatientAppointmentService
    , private clinicalUserService: DotorUserService) {

  }
  public findPatients() {
    return this.loggedInService.selectedClinic$.pipe(
      switchMap(clinicId => this.patientAppointmentService.getPateint(clinicId)),
      filter(patients => patients !== null),
      map(response => {
        return response;
      }))
  }
  public findAllTherapists() {
    return this.clinicalUserService.getAllClinicalsUsers().pipe(
      filter(therapists => therapists !== null),
      map(response => {
        return response;
      })
    )
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
  public initializeAppointmentDate(appointment: Appointment, startDate?: Date) {
    if (startDate) {
      appointment.appointmentDate.startDate = startDate;
      appointment.appointmentDate.startTime = moment(startDate).set("hour", 8).set("minute", 0).toDate();;
      appointment.appointmentDate.endDate = moment(appointment.appointmentDate.startDate).toDate();
      appointment.appointmentDate.endTime = moment(appointment.appointmentDate.startTime).add(30, 'minutes').toDate()
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
