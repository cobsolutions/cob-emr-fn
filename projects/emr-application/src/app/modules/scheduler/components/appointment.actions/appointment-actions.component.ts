import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { filter, Observable, tap } from 'rxjs';
import { AppointmentEmittingService } from '../../service/appointment-emitting.service';

@Component({
  selector: 'app-appointment-actions',
  templateUrl: './appointment-actions.component.html',
  styleUrls: ['./appointment-actions.component.css']
})
export class AppointmentActionsComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>();
  patientName: string
  pateintCase: string
  appointmentStartDate: Date;
  appointmentEndDate: Date;
  appointmentStatus: string;
  appointmentType: string;
  @Input() event: CalendarEvent;

  constructor(private appointmentEmittingService: AppointmentEmittingService) { }

  ngOnInit(): void {
    this.patientName = this.event.title.split(':')[0]
    this.pateintCase = this.event.title.split(':')[1]
    this.appointmentStartDate = this.event.start
    this.appointmentEndDate = this.event.end;
    this.appointmentStatus = this.event.meta.status
    this.appointmentType = this.event.meta.type
  }
}
