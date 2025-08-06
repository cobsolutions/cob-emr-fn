import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import * as moment from 'moment';
import { map, switchMap } from 'rxjs';
import { Appointment } from '../../../models/appointment';
import { AppointmentEventConverterService } from '../../../service/appointment-event-converter.service';
import { AppointmentService } from '../../../service/appointment.service';
import { AppointmentTypeService } from '../../../service/appointment.type/appointment-type.service';

@Component({
  selector: 'app-appointment-status-modal',
  templateUrl: './appointment-status-modal.component.html',
  styleUrls: ['./appointment-status-modal.component.css']
})
export class AppointmentStatusModalComponent implements OnInit {
  appointment: Appointment
  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: CalendarEvent, action: string },
    private dialogRef: MatDialogRef<AppointmentStatusModalComponent>
    , private appointmentService: AppointmentService
    , private appointmentTypeService: AppointmentTypeService
    , private appointmentEventConverterService: AppointmentEventConverterService) { }
  ngOnInit(): void {
    this.appointmentService.retrieveAppointment(Number(this.data.event.id)).pipe(
      switchMap((appointment) => {
        return this.appointmentTypeService.retrieveAppointmentTypeById(appointment.appointmentTypeId).pipe(
          map((appointmentType: any) => {
            const updatedAppointment = {
              ...appointment,
            };
            updatedAppointment.appointmentType = appointmentType.name
            updatedAppointment.appointmentTypeColor = appointmentType.color
            updatedAppointment.appointmentFontTypeColor = appointmentType.fontColor
            return updatedAppointment;
          })
        );
      })
    )
      .subscribe((result: any) => {
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
  private updateAppointmentStatus(status: string) {
    this.appointment.appointmentStatus = status;
    this.appointmentService.updateAppointmentStatus(this.appointment)
      .subscribe(() => {
        var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(this.appointment)
        this.data.action = status
        this.data.event = event
        this.dialogRef.close(this.data);
      })
  }
  onConfirmed(): void {
    this.updateAppointmentStatus('Confirmed')
  }
  onCheckin(): void {
    this.updateAppointmentStatus('CheckIn')
  }
  onCheckout(): void {
    this.updateAppointmentStatus('Checkout')
  }
  onCancel() {
    this.data.action = 'Canceled'
    this.dialogRef.close(this.data);
  }
  onNoShow() {
    this.data.action = 'Noshow'
    this.dialogRef.close(this.data);
  }
}
