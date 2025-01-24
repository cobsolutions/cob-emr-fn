import { Component, Input, OnInit } from '@angular/core';
import { AppointmentFullSeries } from '../../../models/appointment.full.series';

@Component({
  selector: 'full-series-appointment',
  templateUrl: './full-series-appointment.component.html',
  styleUrls: ['./full-series-appointment.component.css']
})
export class FullSeriesAppointmentComponent implements OnInit {
  @Input() appointmentFullSeries: AppointmentFullSeries
  toBeEdit: AppointmentFullSeries = {}
  constructor() { }

  ngOnInit(): void {
    this.initModel();
  }
  compareFn = this._compareFn.bind(this);
  _compareFn(a, b) {
    return Number(a?.id) === Number(a?.id);
  }
  private initModel() {
    this.toBeEdit.selectedCase = this.appointmentFullSeries.patientCases[0]
  }
}
