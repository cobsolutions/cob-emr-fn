import { Injectable } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import * as moment from 'moment';
import { SchedulerType } from '../../common/models/scheduler/scheduler.type';
import { Appointment } from '../models/appointment';

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
      title: appointment.title,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      color: {
        primary: SchedulerType[appointment.appointmentType],
        secondary: SchedulerType[appointment.appointmentType]
      },
      meta: {
        'status': appointment.appointmentStatus,
        'type': appointment.appointmentType,
      }
    }
    return event;
  }

  public converttoAppointment(event: CalendarEvent, optionalAppointment?: Appointment): Appointment {
    return null;
  }
}
