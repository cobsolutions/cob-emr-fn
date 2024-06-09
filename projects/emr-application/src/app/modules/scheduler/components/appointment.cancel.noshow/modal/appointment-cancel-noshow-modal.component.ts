import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'app-appointment-cancel-noshow-modal',
  templateUrl: './appointment-cancel-noshow-modal.component.html',
  styleUrls: ['./appointment-cancel-noshow-modal.component.css']
})
export class AppointmentCancelNoshowModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: CalendarEvent, action: string }) { }

  ngOnInit(): void {
  }

  update() {

  }
}
