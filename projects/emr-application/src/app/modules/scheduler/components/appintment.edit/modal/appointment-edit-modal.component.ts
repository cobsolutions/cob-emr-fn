import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../../../../patient/models/appointments/appointment';

@Component({
  selector: 'app-appointment-edit-modal',
  templateUrl: './appointment-edit-modal.component.html',
  styleUrls: ['./appointment-edit-modal.component.css']
})
export class AppointmentEditModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment }
    , private dialogRef: MatDialogRef<AppointmentEditModalComponent>) { }

  ngOnInit(): void {
    // console.log(JSON.stringify(this.data.appointment))
    this.dialogRef.close(this.data);
  }

}
