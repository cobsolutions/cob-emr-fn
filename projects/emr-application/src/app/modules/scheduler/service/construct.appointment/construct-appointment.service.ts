import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Appointment } from '../../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class ConstructAppointmentService {

  constructor() { }

  public constructAppointmentDate(appointment: Appointment) {
    console.log(appointment.appointmentDate.startTime.getHours())
    console.log(appointment.appointmentDate.startTime.getMinutes())
    var startDate: Date = moment(appointment.appointmentDate.startDate).toDate();
    startDate.setHours(appointment.appointmentDate.startTime.getHours())
    startDate.setMinutes(appointment.appointmentDate.startTime.getMinutes())
    appointment.startDate = moment(startDate).unix() * 1000;

    var endDate: Date = moment(appointment.appointmentDate.endDate).toDate();
    endDate.setHours(appointment.appointmentDate.endTime.getHours())
    endDate.setMinutes(appointment.appointmentDate.endTime.getMinutes())
    appointment.endDate = moment(endDate).unix() * 1000;
  }
}
