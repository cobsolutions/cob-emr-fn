import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import { AppointmentEditModalComponent } from '../../appintment.edit/modal/appointment-edit-modal.component';

@Component({
  selector: 'app-appointment-action-modal',
  templateUrl: './appointment-action-modal.component.html',
  styleUrls: ['./appointment-action-modal.component.css']
})
export class AppointmentActionModalComponent implements OnInit {
  patientName: string
  pateintCase: string
  appointmentStartDate: Date;
  appointmentEndDate: Date;
  appointmentType: string;
  appointmentStatus: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: CalendarEvent, action: string }
    , private dialogRef: MatDialogRef<AppointmentEditModalComponent>) { }

  ngOnInit(): void {
    this.initAppointmentPatientInfo();
  }
  public editAppointment() {
    this.data.action = 'edit'
    this.dialogRef.close(this.data);
  }
  public openAppointmentStatus() {
    this.data.action = 'status'
    this.dialogRef.close(this.data);
  }
  public close() {
    this.dialogRef.close(null);
  }
  private initAppointmentPatientInfo() {
    this.patientName = this.data.event.title.split(':')[0]
    this.pateintCase = this.data.event.title.split(':')[1]
    this.appointmentStartDate = this.data.event.start
    this.appointmentEndDate = this.data.event.end;
    this.appointmentStatus = this.data.event.meta.status
    this.appointmentType = this.data.event.meta.type
  }
}
