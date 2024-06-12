import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import * as moment from 'moment';
import { Appointment } from '../../../models/appointment';
import { AppointmentEventConverterService } from '../../../service/appointment-event-converter.service';
import { AppointmentService } from '../../../service/appointment.service';

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
    , private appointmentEventConverterService: AppointmentEventConverterService) { }
  statusDisabled: boolean = false;
  ngOnInit(): void {
    this.appointmentService.retrieveAppointment(Number(this.data.event.id)).subscribe(result => {
      this.appointment = result;
      this.checkValidityToChangeStatus();
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
    this.appointmentService.updateAppointment(this.appointment)
      .subscribe(() => {
        var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(this.appointment)
        this.data.action = 'status-updated'
        this.data.event = event
        this.dialogRef.close(this.data);
      })
  }
  checkValidityToChangeStatus() {
    const currentDate = moment(new Date()).unix() * 1000;
    const appointmentStartDate = this.appointment.startDate;
    if (appointmentStartDate > currentDate) {
      this.statusDisabled = true;
    }
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
    this.data.action = 'status-cancled'
    this.dialogRef.close(this.data);
  }
  onNoShow() {
    this.data.action = 'status-noshow'
    this.dialogRef.close(this.data);
  }
}
