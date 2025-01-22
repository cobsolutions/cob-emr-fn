import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';
import { Settings } from '../../scheduler.view/util/fetch.scheduler.settings';

@Component({
  selector: 'edit-appointment-series-modal',
  templateUrl: './edit-appointment-series-modal.component.html',
  styleUrls: ['./edit-appointment-series-modal.component.css']
})
export class EditAppointmentSeriesModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: CalendarEvent, action: string, schedulerSettings: Settings }
    , private dialogRef: MatDialogRef<EditAppointmentSeriesModalComponent>) { }

  ngOnInit(): void {
  }
  public update() {

  }
  public cancel() {
    this.data.action = 'cancel';
    this.dialogRef.close(this.data);
  }
}
