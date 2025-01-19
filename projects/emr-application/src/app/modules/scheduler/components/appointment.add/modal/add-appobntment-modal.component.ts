import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: { startDate: Date, calendarId: number, event: CalendarEvent[], schedulerSettings: Settings, action: string }
    , private dialogRef: MatDialogRef<AddAppobntmentModalComponent>
    , private appointmentEventConverterService: AppointmentEventConverterService) { }

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(event => {
      this.cancel();
    });
  }
  create() {
    this.appointmentAddComponent.createAppointment();
    this.appointmentAddComponent.createAppointment().subscribe((createdAppointments: any) => {
      if (!(createdAppointments.length > 1))
        this.createSingleAppointment(createdAppointments)
      else
        this.createRepeatedAppointments(createdAppointments)
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
      var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(appointmet)
      events.push(event);
    });
    this.data.event = events;
    this.data.calendarId = this.appointmentAddComponent.appointment.calendarId
  }
  private createSingleAppointment(createdAppointmnet: any) {
    var events: CalendarEvent[] = []
    var appointmet: Appointment = this.appointmentAddComponent.appointment;
    appointmet.appointmentTypeColor = createdAppointmnet[0].appointmentTypeColor
    appointmet.appointmentFontTypeColor = createdAppointmnet[0].appointmentFontTypeColor
    appointmet.appointmentStructure = createdAppointmnet[0].appointmentStructure
    var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(appointmet)
    events.push(event);
    this.data.event = events;
    this.data.calendarId = this.appointmentAddComponent.appointment.calendarId
    this.dialogRef.close(this.data);
  }
}
