import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import { AppointmentEventConverterService } from '../../../service/appointment-event-converter.service';
import { AppointmentAddComponent } from '../appointment-add.component';

@Component({
  selector: 'app-add-appobntment-modal',
  templateUrl: './add-appobntment-modal.component.html',
  styleUrls: ['./add-appobntment-modal.component.css']
})
export class AddAppobntmentModalComponent implements OnInit {
  @ViewChild('appointmentAddComponent') appointmentAddComponent: AppointmentAddComponent;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { startDate: Date, event: CalendarEvent }
    , private dialogRef: MatDialogRef<AddAppobntmentModalComponent>
    , private appointmentEventConverterService: AppointmentEventConverterService) { }

  ngOnInit(): void {
  }
  create() {
    this.appointmentAddComponent.createAppointment().subscribe((createdAppointment: any) => {
      var event: CalendarEvent = this.appointmentEventConverterService.convertToEvent(this.appointmentAddComponent.appointment)
      this.data.event = event;
      this.dialogRef.close(this.data);
    })
  }
}
