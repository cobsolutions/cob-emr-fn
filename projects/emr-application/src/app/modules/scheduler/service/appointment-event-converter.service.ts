import { Injectable } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import * as moment from 'moment';
import { SchedulerType } from '../../common/models/scheduler/scheduler.type';
import { Appointment } from '../models/appointment';
import { AppointmentTypeService } from './appointment.type/appointment-type.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentEventConverterService {

  constructor() { }
  public convertToEvent(appointment: Appointment): CalendarEvent {
    var event: CalendarEvent = {
      id: appointment.id,
      start: moment.unix(appointment.startDate / 1000).toDate(),
      end: moment.unix(appointment.endDate / 1000).toDate(),
      title: appointment.title + '<br/>' + ((appointment.note === null || appointment.note === undefined) ? "" : appointment.note),
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      color: {
        primary: this.setAppointmentColor(appointment),
        secondary: this.setAppointmentColor(appointment),
        secondaryText: this.setAppointmentFontColor(appointment)
      },
      meta: {
        'patient_id': appointment.patientId,
        'status': appointment.appointmentStatus,
        'type': appointment.appointmentType,
        'structure': appointment.appointmentStructure,
        'calendar_id': appointment.calendarId,
        'seriesId': appointment.seriesId
      }
    }
    return event;
  }

  private setAppointmentColor(appointment: Appointment): string {
    if (appointment.appointmentStatus === 'Cancel' || appointment.appointmentStatus === 'NoShow')
      return '#151617'
    else
      return appointment.appointmentTypeColor
  }
  private setAppointmentFontColor(appointment: Appointment): string {
    if (appointment.appointmentStatus === 'Cancel' || appointment.appointmentStatus === 'NoShow')
      return '#e9135b'
    else
      return appointment.appointmentFontTypeColor
  }
}
