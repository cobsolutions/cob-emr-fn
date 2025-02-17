import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import * as moment from 'moment';
import { map, switchMap } from 'rxjs';
import { Appointment } from '../../../models/appointment';
import { AppointmentCancelNoShowReason } from '../../../models/appointment.cancel.no.show.reason';
import { AppointmentEventConverterService } from '../../../service/appointment-event-converter.service';
import { AppointmentService } from '../../../service/appointment.service';
import { AppointmentTypeService } from '../../../service/appointment.type/appointment-type.service';
import { AppointmentCancelNoshowComponent } from '../appointment-cancel-noshow.component';

@Component({
  selector: 'app-appointment-cancel-noshow-modal',
  templateUrl: './appointment-cancel-noshow-modal.component.html',
  styleUrls: ['./appointment-cancel-noshow-modal.component.css']
})
export class AppointmentCancelNoshowModalComponent implements OnInit {
  appointment: Appointment
  @ViewChild('appointmentCancelNoshowComponent') appointmentCancelNoshowComponent: AppointmentCancelNoshowComponent;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: CalendarEvent, action: string }
    , private dialogRef: MatDialogRef<AppointmentCancelNoshowModalComponent>
    , private appointmentService: AppointmentService
    , private appointmentTypeService: AppointmentTypeService
    , private appointmentEventConverterService: AppointmentEventConverterService) { }

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(event => {
      this.cancel();
    });
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
    ).subscribe(result => {
      this.appointment = result;
    })
  }

  update() {
    switch (this.data.action) {
      case 'cancel':
        this.appointmentCancelNoshowComponent.appointmentCancelNoShowReason.reasonDate = moment(this.appointmentCancelNoshowComponent.resonDate).unix() * 1000;
        this.updateAppointmentStatus('Cancel', this.appointmentCancelNoshowComponent.appointmentCancelNoShowReason)
        break;
      case 'noshow':
        this.updateAppointmentStatus('NoShow', this.appointmentCancelNoshowComponent.appointmentCancelNoShowReason)
        break;
    }
  }
  private updateAppointmentStatus(status: string, appointmentCancelNoShowReason: AppointmentCancelNoShowReason) {
    this.appointment.appointmentStatus = status;
    appointmentCancelNoShowReason.appointmentId = this.appointment.id
    appointmentCancelNoShowReason.status = status
    this.appointmentService.updateAppointmentCancelNoShow(appointmentCancelNoShowReason)
      .subscribe(() => {
        var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(this.appointmentCancelNoshowComponent.appointment)
        this.data.event = event
        this.dialogRef.close(this.data);
      })
  }
  public cancel() {
    this.data.action = 'cancel';
    this.dialogRef.close(this.data);
  }
}
