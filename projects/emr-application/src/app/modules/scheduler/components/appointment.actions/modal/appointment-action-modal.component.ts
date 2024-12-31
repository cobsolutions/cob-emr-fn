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

  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: CalendarEvent, action: string }
    , private dialogRef: MatDialogRef<AppointmentEditModalComponent>) { }

  ngOnInit(): void {
  }
  public editAppointment() {
    this.data.action = 'edit'
    this.dialogRef.close(this.data);
  }
  public appointmentStatus() {
    this.data.action = 'status'
    this.dialogRef.close(this.data);
  }
  public close(){
    this.dialogRef.close(null);
  }
}
