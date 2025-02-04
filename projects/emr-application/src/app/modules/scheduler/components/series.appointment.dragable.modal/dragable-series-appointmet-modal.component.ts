import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../../models/appointment';
import { AppointmentService } from '../../service/appointment.service';

@Component({
  selector: 'app-dragable-series-appointmet-modal',
  templateUrl: './dragable-series-appointmet-modal.component.html',
  styleUrls: ['./dragable-series-appointmet-modal.component.css']
})
export class DragableSeriesAppointmetModalComponent implements OnInit {
  appointment: Appointment
  constructor(@Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment, action: string, appintmentsContainer: any, selection: string }
    , private dialogRef: MatDialogRef<DragableSeriesAppointmetModalComponent>
    , private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
    this.appointment = this.data.appointment
  }
  editAllAppointmentSeriesDateAction() {
    console.log(JSON.stringify(this.appointment))
    this.appointmentService.updateSeriesAppointment(this.appointment).subscribe(appintmentsContainer => {
      this.data.selection = 'all'
      this.data.appintmentsContainer = appintmentsContainer
      this.dialogRef.close(this.data);
    })
  }
  editOneAppointmentSeriesDateAction() {
    this.appointmentService.updateSingleAppointment(this.appointment).subscribe((updatedAppointment: any) => {
      this.data.selection = 'one'
      this.data.appointment = updatedAppointment
      this.dialogRef.close(this.data);
    })
  }
  closeAppointmentSeriesDateAction() {
    this.data.action = 'cancel';
    this.dialogRef.close(this.data);
  }
}
