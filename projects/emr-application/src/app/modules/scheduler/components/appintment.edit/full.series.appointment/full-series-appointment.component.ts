import { Component, Input, OnInit } from '@angular/core';
import { AppointmentFullSeries } from '../../../models/appointment.full.series';

@Component({
  selector: 'full-series-appointment',
  templateUrl: './full-series-appointment.component.html',
  styleUrls: ['./full-series-appointment.component.css']
})
export class FullSeriesAppointmentComponent implements OnInit {
  @Input() appointmentFullSeries: AppointmentFullSeries
  constructor() { }

  ngOnInit(): void {
  }

}
