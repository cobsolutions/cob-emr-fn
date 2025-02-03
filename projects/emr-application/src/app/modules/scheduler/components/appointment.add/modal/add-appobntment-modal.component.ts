import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import { tap } from 'rxjs';
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
  module: string
  @ViewChild('appointmentAddComponent') appointmentAddComponent: AppointmentAddComponent;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { startDate: Date, calendarId: number, event: CalendarEvent[], schedulerSettings: Settings, action: string, module: string }
    , private dialogRef: MatDialogRef<AddAppobntmentModalComponent>
    , private appointmentEventConverterService: AppointmentEventConverterService) { }

  ngOnInit(): void {
    this.module = this.data.module
    this.dialogRef.backdropClick().subscribe(event => {
      this.cancel();
    });
  }
  create() {
    this.appointmentAddComponent.createAppointment()
      .subscribe((createdAppointments: any) => {
        if (!(Array.isArray(createdAppointments))) {
          console.log('not repeated')
          this.createSingleAppointment(createdAppointments)
        }
        else {
          console.log('repeated')
          this.createRepeatedAppointments(createdAppointments)
        }
        this.dialogRef.close(this.data);
      })
  }
  public cancel() {
    this.data.action = 'cancel';
    this.dialogRef.close(this.data);
  }
  private createRepeatedAppointments(createdAppointmnet: any) {
    var events: CalendarEvent[] = []
    createdAppointmnet.forEach(element => {
      var appointmet: Appointment = this.appointmentAddComponent.appointment;
      appointmet.startDate = element.startDate
      appointmet.endDate = element.endDate
      appointmet.appointmentTypeColor = element.appointmentTypeColor
      appointmet.appointmentFontTypeColor = element.appointmentFontTypeColor
      appointmet.appointmentStructure = element.appointmentStructure
      appointmet.appointmentRepeat = element.appointmentRepeat
      appointmet.seriesId = element.seriesId
      var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(appointmet)
      event.id = element.id
      event.meta.type = element.appointmentType;
      event.meta.status = element.appointmentStatus;
      events.push(event);
    });
    this.data.event = events;
    this.data.calendarId = this.appointmentAddComponent.appointment.calendarId
  }
  private createSingleAppointment(createdAppointmnet: any) {
    var events: CalendarEvent[] = []
    var appointmet: Appointment = this.appointmentAddComponent.appointment;
    appointmet.appointmentTypeColor = createdAppointmnet.appointmentTypeColor
    appointmet.appointmentFontTypeColor = createdAppointmnet.appointmentFontTypeColor
    appointmet.appointmentStructure = createdAppointmnet.appointmentStructure
    appointmet.seriesId = createdAppointmnet.seriesId
    var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(appointmet)
    event.id = createdAppointmnet.id
    event.meta.type = createdAppointmnet.appointmentType;
    event.meta.status = createdAppointmnet.appointmentStatus;
    events.push(event);
    this.data.event = events;
    this.data.calendarId = this.appointmentAddComponent.appointment.calendarId
    this.dialogRef.close(this.data);
  }
}
