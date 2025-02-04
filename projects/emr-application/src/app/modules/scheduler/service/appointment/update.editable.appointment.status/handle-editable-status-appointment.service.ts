import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import { Subject } from 'rxjs';
import { AppointmentAction, RefreshSchedulerEvents } from '../../../refresh.scheduler.event';
import { AppointmentActionsService } from '../../actions/appointment-actions.service';

@Injectable({
  providedIn: 'root'
})
export class HandleEditableStatusAppointmentService {
  refresh = new Subject<void>();
  dialog: MatDialog
  constructor(private appointmentActionsService: AppointmentActionsService) { }

  public handle(event: CalendarEvent, events: CalendarEvent[]) {
    this.appointmentActionsService.appointmentStatus(this.dialog, event).subscribe(result => {
      switch (result.action) {
        case 'Confirmed':
        case 'CheckIn':
        case 'Checkout':
          this.refreshEvent(result.event, events)
          break;
        case 'Canceled':
          this.openCancelModal(event, events);
          break;
        case 'Noshow':
          this.openNoshowModal(event, events);
          break;
        case 'cancel':
          break;
      }
    })
  }
  private refreshEvent(event: CalendarEvent, events: CalendarEvent[]) {
    RefreshSchedulerEvents.refresh(events, event, AppointmentAction.EDIT_APPOINTMENT);
    this.refresh.next();
  }
  private openCancelModal(event: CalendarEvent, events: CalendarEvent[]) {
    this.appointmentActionsService.appointmnetStatusCancel(this.dialog, event).subscribe(result => {
      if (result.action !== 'noshow') {
        this.refreshEvent(result.event, events)
      }
    })
  }

  private openNoshowModal(event: CalendarEvent, events: CalendarEvent[]) {
    this.appointmentActionsService.appointmnetStatusNoShow(this.dialog, event).subscribe(result => {
      if (result.action !== 'cancel') {
        this.refreshEvent(result.event, events)
      }
    })
  }
}
