import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { Appointment } from '../../../models/appointment';
import { AppointmentSkeleton } from '../../../models/appointment.skeleton';
import { AppointmentAction, RefreshSchedulerEvents } from '../../../refresh.scheduler.event';
import { AppointmentActionsService } from '../../actions/appointment-actions.service';
import { AppointmentEventConverterService } from '../../appointment-event-converter.service';
import { AppointmentService } from '../../appointment.service';

@Injectable({
  providedIn: 'root'
})
export class HandleDragableAppointmentService {
  refresh = new Subject<void>();
  dialog: MatDialog
  dragableAppointment: Appointment;
  constructor(private appointmentService: AppointmentService,
    private appointmentEventConverterService: AppointmentEventConverterService,
    private appointmentActionsService: AppointmentActionsService) { }

  public handle(appointment: Appointment, events: CalendarEvent[], newStart: Date, newEnd: Date, module?: string) {
    switch (this.appointmentSkeleton(appointment)) {
      case AppointmentSkeleton.Single:
        this.setDragableAppointmentDate(appointment, newStart, newEnd);
        this.handleSingle(events);
        break;
      case AppointmentSkeleton.Series:
        this.setDragableAppointmentDate(appointment, newStart, newEnd);
        this.handleSeries(events, module);
        break;
    }
  }

  private handleSingle(events: CalendarEvent[]) {
    this.appointmentService.updateSingleAppointment(this.dragableAppointment).subscribe((updatedAppointment: any) => {
      var updatedEvent: CalendarEvent = this.appointmentEventConverterService.convertToEvent(updatedAppointment)
      RefreshSchedulerEvents.refresh(events, updatedEvent, AppointmentAction.EDIT_APPOINTMENT);
      this.refresh.next();
    })
  }
  private handleSeries(events: CalendarEvent[], module: string) {
    this.appointmentActionsService.promptDragSeriesAppointments(this.dialog, this.dragableAppointment).subscribe(result => {
      if (result.action !== 'cancel') {
        switch (result.selection) {
          case 'all':
            this.updateAllAppointments(result.appintmentsContainer, events, module);
            this.refresh.next();
            break;
          case 'one':
            this.updateOneAppointment(result.appointment, events)
            break;
        }
      }
    })
  }

  private appointmentSkeleton(appointment: Appointment): AppointmentSkeleton {
    if (appointment.id !== appointment.seriesId)
      return AppointmentSkeleton.Series
    else
      return AppointmentSkeleton.Single;
  }
  private setDragableAppointmentDate(appointment, startDate: Date, endDate: Date) {
    appointment.startDate = moment(startDate).unix() * 1000;
    appointment.endDate = moment(endDate).unix() * 1000;

    this.dragableAppointment = appointment;
  }
  private updateAllAppointments(appintmentsContainer: any, events: CalendarEvent[], module: string) {
    if (module === 'day') {
      appintmentsContainer.addedRenderAppointment.forEach(appointmet => {
        if (appointmet.id === this.dragableAppointment.id) {
          var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(appointmet)
          RefreshSchedulerEvents.refresh(events, event, AppointmentAction.EDIT_APPOINTMENT);
        }
      })
    } else {
      if (appintmentsContainer.deletedRenderAppointment === null) {
        appintmentsContainer.addedRenderAppointment.forEach(appointmet => {
          var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(appointmet)
          RefreshSchedulerEvents.refresh(events, event, AppointmentAction.EDIT_APPOINTMENT);
        })
        this.refresh.next();
      } else {
        appintmentsContainer.deletedRenderAppointment.forEach(appointmet => {
          var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(appointmet)
          RefreshSchedulerEvents.refresh(events, event, AppointmentAction.REMVOE_APPOINTMENT);
        })
        appintmentsContainer.addedRenderAppointment.forEach(appointmet => {
          var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(appointmet)
          RefreshSchedulerEvents.refresh(events, event, AppointmentAction.ADD_APPOINTMENT);
        })
        this.refresh.next();
      }
    }
  }
  private updateOneAppointment(updatedAppointment: Appointment, events: CalendarEvent[]) {
    var updatedEvent: CalendarEvent = this.appointmentEventConverterService.convertToEvent(updatedAppointment)
    RefreshSchedulerEvents.refresh(events, updatedEvent, AppointmentAction.EDIT_APPOINTMENT);
    this.refresh.next();
  }

}
