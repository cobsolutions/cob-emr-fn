import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import { filter, switchMap } from 'rxjs';
import { Appointment } from '../../../models/appointment';
import { AppointmentEmittingService } from '../../../service/appointment-emitting.service';
import { AppointmentService } from '../../../service/appointment.service';

@Component({
  selector: 'app-appointment-edit-modal',
  templateUrl: './appointment-edit-modal.component.html',
  styleUrls: ['./appointment-edit-modal.component.css']
})
export class AppointmentEditModalComponent implements OnInit {
  appointment: Appointment
  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: CalendarEvent, action: string }
    , private dialogRef: MatDialogRef<AppointmentEditModalComponent>
    , private appointmentEmittingService: AppointmentEmittingService
    , private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.retrieveAppointment(Number(this.data.event.id)).subscribe(result => {
      this.appointment = result;
    })
    // this.appointmentEmittingService.selectedAppointment$.pipe(
    //   filter((appointmentId) => appointmentId !== null),
    //   switchMap((appointmentId) => this.appointmentService.retrieveAppointment(appointmentId))
    // ).subscribe((result) => {
    //   this.appointment = result;
    // })
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.cancel();
      }
    });

    this.dialogRef.backdropClick().subscribe(event => {
      this.cancel();
    });
  }
  public cancel() {
    this.data.action = 'cancel';
    this.dialogRef.close(this.data);
  }
  public update() { }

}
