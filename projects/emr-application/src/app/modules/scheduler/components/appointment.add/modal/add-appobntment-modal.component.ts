import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import { Observable } from 'rxjs';
import { SchedulerSettings } from '../../../model/shceduler.date.settings';
import { Appointment } from '../../../models/appointment';
import { AppointmentEventConverterService } from '../../../service/appointment-event-converter.service';
import { Settings } from '../../scheduler.view/util/fetch.scheduler.settings';
import { AppointmentAddComponent } from '../appointment-add.component';

@Component({
  selector: 'app-add-appobntment-modal',
  templateUrl: './add-appobntment-modal.component.html',
  styleUrls: ['./add-appobntment-modal.component.css']
})
export class AddAppobntmentModalComponent implements OnInit {
  @ViewChild('appointmentAddComponent') appointmentAddComponent: AppointmentAddComponent;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { startDate: Date, calendarId: number, event: CalendarEvent, schedulerSettings: Observable<Settings>, action: string }
    , private dialogRef: MatDialogRef<AddAppobntmentModalComponent>
    , private appointmentEventConverterService: AppointmentEventConverterService) { }

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(event => {
      this.cancel();
    });
  }
  create() {
    this.appointmentAddComponent.createAppointment();
    // this.appointmentAddComponent.createAppointment().subscribe((createdAppointmentId: any) => {
    //   var appointmet: Appointment = this.appointmentAddComponent.appointment;
    //   appointmet.appointmentTypeColor = createdAppointmentId[0].appointmentTypeColor
    //   appointmet.appointmentFontTypeColor = createdAppointmentId[0].appointmentFontTypeColor
    //   var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(this.appointmentAddComponent.appointment)
    //   event.id = createdAppointmentId
    //   this.data.event = event;
    //   this.data.calendarId = this.appointmentAddComponent.appointment.calendarId
    //   this.dialogRef.close(this.data);
    // })
  }
  public cancel() {
    this.data.action = 'cancel';
    this.dialogRef.close(this.data);
  }
}
