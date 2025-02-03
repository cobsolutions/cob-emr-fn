import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../../models/appointment';
import { AppointmentService } from '../../service/appointment.service';

@Component({
  selector: 'app-editable-series-appointment-modal',
  templateUrl: './editable-series-appointment-modal.component.html',
  styleUrls: ['./editable-series-appointment-modal.component.css']
})
export class EditableSeriesAppointmentModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment, action: string, appintmentsContainer: any, selection: string }
    , private dialogRef: MatDialogRef<EditableSeriesAppointmentModalComponent>
    , private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
  }
  closeAppointmentSeriesDateAction() {
    this.data.action = 'cancel';
    this.dialogRef.close(this.data);
  }
  editOneAppointmentSeriesDateAction() {
    this.data.selection = 'one'
    this.dialogRef.close(this.data);
  }
  editAllAppointmentSeriesDateAction() {
    this.data.selection = 'all'
    this.dialogRef.close(this.data);
  }
}
