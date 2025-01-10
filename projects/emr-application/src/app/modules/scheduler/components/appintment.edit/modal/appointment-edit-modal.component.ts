import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import { result } from 'lodash';
import { Observable } from 'rxjs';
import { Appointment } from '../../../models/appointment';
import { AppointmentEventConverterService } from '../../../service/appointment-event-converter.service';
import { AppointmentService } from '../../../service/appointment.service';
import { ConstructAppointmentService } from '../../../service/construct.appointment/construct-appointment.service';
import { BlockAppointmentComponent } from '../../appointment.add/block.appointment/block-appointment.component';
import { FullAppointmentComponent } from '../../appointment.add/full.appointment/full-appointment.component';
import { Settings } from '../../scheduler.view/util/fetch.scheduler.settings';
@Component({
  selector: 'app-appointment-edit-modal',
  templateUrl: './appointment-edit-modal.component.html',
  styleUrls: ['./appointment-edit-modal.component.css']
})
export class AppointmentEditModalComponent implements OnInit {
  @ViewChild('fullAppointment') fullAppointment: FullAppointmentComponent;
  @ViewChild('blockAppointment') blockAppointment: BlockAppointmentComponent;
  appointment: Appointment
  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: CalendarEvent, action: string, schedulerSettings: Settings }
    , private dialogRef: MatDialogRef<AppointmentEditModalComponent>
    , private appointmentService: AppointmentService
    , private appointmentEventConverterService: AppointmentEventConverterService
    , private constructAppointmentService: ConstructAppointmentService) { }

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(event => {
      this.cancel();
    });
  }
  public cancel() {
    this.data.action = 'cancel';
    this.dialogRef.close(this.data);
  }
  public update() {
    this.pickAppointment();
    this.constructAppointmentService.constructAppointmentDate(this.appointment)
    this.appointmentService.createAppointment(this.appointment).subscribe(createdAppointment => {
      var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(createdAppointment[0])
      this.data.action = 'updated'
      this.data.event = event
      this.dialogRef.close(this.data);
    })
  }
  private pickAppointment() {
    if (this.data.event.meta.structure === 'Full') {
      this.appointment = this.fullAppointment.appointment;
    }
    if (this.data.event.meta.structure === 'Block') {
      this.appointment = this.blockAppointment.appointment;
    }
  }
}
