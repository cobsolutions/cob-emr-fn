import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import { Subject } from 'rxjs';
import { Settings } from '../../../components/scheduler.view/util/fetch.scheduler.settings';
import { AppointmentSkeleton } from '../../../models/appointment.skeleton';
import { RenderEventsContainer } from '../../../models/render.events.container';
import { AppointmentAction, RefreshSchedulerEvents } from '../../../refresh.scheduler.event';
import { AppointmentActionsService } from '../../actions/appointment-actions.service';

@Injectable({
  providedIn: 'root'
})
export class HandleEditableAppointmentService {
  refresh = new Subject<void>();
  dialog: MatDialog
  schedulerSettings: Settings
  constructor(private appointmentActionsService: AppointmentActionsService) { }

  public handle(event: CalendarEvent, events: CalendarEvent[], module?: string) {
    switch (this.appointmentSkeleton(event)) {
      case AppointmentSkeleton.Single:
        this.handleSingle(event, events)
        break;
      case AppointmentSkeleton.Series:
        this.handleSeries(event, events, module)
        break;
    }
  }

  private handleSingle(changedEvent: CalendarEvent, events: CalendarEvent[]) {
    this.appointmentActionsService.editAppointment(this.dialog, changedEvent, this.schedulerSettings).subscribe(result => {
      if (result.action !== 'cancel') {
        RefreshSchedulerEvents.refresh(events, result.event, AppointmentAction.EDIT_APPOINTMENT);
        this.refresh.next();
      }
    });
  }
  private handleSeries(changedEvent: CalendarEvent, events: CalendarEvent[], module: string) {
    this.appointmentActionsService.promptEditableSeriesAppointments(this.dialog).subscribe(result => {
      switch (result.selection) {
        case 'all':
          this.handleAllSeriesAppointments(changedEvent, events, module);
          break;
        case 'one':
          this.handleOneSeriesAppointment(changedEvent, events);
          break;
      }
    })
  }
  private appointmentSkeleton(event: CalendarEvent): AppointmentSkeleton {
    if (event.meta.seriesId !== event.id)
      return AppointmentSkeleton.Series
    else
      return AppointmentSkeleton.Single;
  }
  private handleAllSeriesAppointments(event: CalendarEvent, events: CalendarEvent[], module: string) {
    this.appointmentActionsService.editAppointmentSeries(this.dialog, event, this.schedulerSettings).subscribe(result => {
      var renderEventsContainer: RenderEventsContainer = result.renderEventsContainer;
      if (module === 'day') {
        renderEventsContainer.addedRenderEvents.forEach(addedEvent => {
          if (addedEvent.id === event.id) {
            RefreshSchedulerEvents.refresh(events, addedEvent, AppointmentAction.EDIT_APPOINTMENT);
          }
        })
      } else {
        if (renderEventsContainer.deletedRenderEvents.length === 0) {
          renderEventsContainer.addedRenderEvents.forEach((event: CalendarEvent) => {
            RefreshSchedulerEvents.refresh(events, event, AppointmentAction.EDIT_APPOINTMENT);
          })
        } else {
          renderEventsContainer.deletedRenderEvents.forEach((event: CalendarEvent) => {
            RefreshSchedulerEvents.refresh(events, event, AppointmentAction.REMVOE_APPOINTMENT);
          })
          renderEventsContainer.addedRenderEvents.forEach((event: CalendarEvent) => {
            RefreshSchedulerEvents.refresh(events, event, AppointmentAction.ADD_APPOINTMENT);
          })
        }
      }

      this.refresh.next();
    })
  }

  private handleOneSeriesAppointment(event: CalendarEvent, events: CalendarEvent[]) {
    this.appointmentActionsService.editAppointment(this.dialog, event, this.schedulerSettings).subscribe(result => {
      RefreshSchedulerEvents.refresh(events, result.event, AppointmentAction.EDIT_APPOINTMENT);
      this.refresh.next();
    })
  }
}
