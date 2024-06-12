import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import { result } from 'lodash';
import { Appointment } from '../../../models/appointment';
import { AppointmentEventConverterService } from '../../../service/appointment-event-converter.service';
import { AppointmentService } from '../../../service/appointment.service';
import { AppointmentEditComponent } from '../appointment-edit.component';

@Component({
  selector: 'app-appointment-edit-modal',
  templateUrl: './appointment-edit-modal.component.html',
  styleUrls: ['./appointment-edit-modal.component.css']
})
export class AppointmentEditModalComponent implements OnInit {
  appointment: Appointment
  @ViewChild('appointmentEditComponent') appointmentEditComponent: AppointmentEditComponent;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: CalendarEvent, action: string }
    , private dialogRef: MatDialogRef<AppointmentEditModalComponent>
    , private appointmentService: AppointmentService
    , private appointmentEventConverterService: AppointmentEventConverterService) { }

  ngOnInit(): void {
    this.appointmentService.retrieveAppointment(Number(this.data.event.id)).subscribe(result => {
      this.appointment = result;
    })
    this.dialogRef.backdropClick().subscribe(event => {
      this.cancel();
    });
  }
  public cancel() {
    this.data.action = 'cancel';
    this.dialogRef.close(this.data);
  }
  public update() {
    this.appointmentService.updateAppointment(this.appointmentEditComponent.appointment).subscribe(result => {
      var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(this.appointmentEditComponent.appointment)
      this.data.action = 'updated'
      this.data.event = event
      this.dialogRef.close(this.data);
    })
  }

}
