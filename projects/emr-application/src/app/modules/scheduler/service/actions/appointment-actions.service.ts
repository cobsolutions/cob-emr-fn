import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import { Observable } from 'rxjs';
import { AppointmentEditModalComponent } from '../../components/appintment.edit/modal/appointment-edit-modal.component';
import { AppointmentActionModalComponent } from '../../components/appointment.actions/modal/appointment-action-modal.component';
import { AddAppobntmentModalComponent } from '../../components/appointment.add/modal/add-appobntment-modal.component';
import { AppointmentCancelNoshowModalComponent } from '../../components/appointment.cancel.noshow/modal/appointment-cancel-noshow-modal.component';
import { AppointmentStatusModalComponent } from '../../components/appointment.status/modal/appointment-status-modal.component';
import { Settings } from '../../components/scheduler.view/util/fetch.scheduler.settings';
import { SchedulerSettings } from '../../model/shceduler.date.settings';

@Injectable({
  providedIn: 'root'
})
export class AppointmentActionsService {

  constructor() { }

  public addAppointment(dialog: MatDialog, viewDate: Date, calendarId: number, schedulerSettings: Observable<Settings>) {
    console.log(schedulerSettings)
    const dialogRef = dialog.open(AddAppobntmentModalComponent, {
      disableClose: true,
      width: '60%',
      data: { startDate: viewDate, calendarId: calendarId, schedulerSettings: schedulerSettings },
      position: {
        top: '8%', // Adjust as needed

      }
    });
    return dialogRef.afterClosed();
  }
  public selectAppointmentActions(dialog: MatDialog, event: CalendarEvent) {
    const dialogRef = dialog.open(AppointmentActionModalComponent, {
      disableClose: true,
      data: { event: event },
      position: {
        top: '8%', // Adjust as needed
      }
    });
    return dialogRef.afterClosed()
  }
  public editAppointment(dialog: MatDialog, event: CalendarEvent) {
    const dialogRef = dialog.open(AppointmentEditModalComponent, {
      disableClose: true,
      data: { event: event, action: undefined },
      width: '60%',
      position: {
        top: '8%',
      }
    });
    return dialogRef.afterClosed();
  }

  public appointmentStatus(dialog: MatDialog, event: CalendarEvent) {
    const dialogRef = dialog.open(AppointmentStatusModalComponent, {
      disableClose: true,
      data: { event: event, action: undefined },
      width: '30%',
      position: {
        top: '8%',
      }
    });
    return dialogRef.afterClosed();
  }

  public appointmnetStatusNoShow(dialog: MatDialog, event: CalendarEvent) {
    const dialogRef = dialog.open(AppointmentCancelNoshowModalComponent, {
      disableClose: true,
      data: { event: event, action: 'noshow' },
      width: '30%',
      position: {
        top: '8%',
      }
    });
    return dialogRef.afterClosed();
  }
  public appointmnetStatusCancel(dialog: MatDialog, event: CalendarEvent) {
    const dialogRef = dialog.open(AppointmentCancelNoshowModalComponent, {
      disableClose: true,
      data: { event: event, action: 'cancel' },
      width: '30%',
      position: {
        top: '8%',
      }
    });
    return dialogRef.afterClosed();
  }
}
