import { Component, Input, OnInit } from '@angular/core';
import { AppointmentBlockSeries } from '../../../models/appointment.block.series';

@Component({
  selector: 'block-series-appointment',
  templateUrl: './block-series-appointment.component.html',
  styleUrls: ['./block-series-appointment.component.css']
})
export class BlockSeriesAppointmentComponent implements OnInit {
  @Input() appointmentBlockSeries: AppointmentBlockSeries
  constructor() { }

  ngOnInit(): void {
  }

}
