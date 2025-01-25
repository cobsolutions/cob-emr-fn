import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { filter } from 'rxjs';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { AppointmentBlockSeries } from '../../../models/appointment.block.series';

@Component({
  selector: 'block-series-appointment',
  templateUrl: './block-series-appointment.component.html',
  styleUrls: ['./block-series-appointment.component.css']
})
export class BlockSeriesAppointmentComponent implements OnInit {
  @Input() appointmentBlockSeries: AppointmentBlockSeries
  toBeEdit: AppointmentBlockSeries = {}
  compareFn = this._compareFn.bind(this);
  startTime: Date;
  endTime: Date
  constructor(private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    this.initModel()
  }
  _compareFn(a, b) {
    return Number(a?.id) === Number(b?.id);
  }

  private initModel() {
    this.startTime = moment.unix(this.appointmentBlockSeries.startTime / 1000).toDate();
    this.endTime = moment.unix(this.appointmentBlockSeries.endTime / 1000).toDate();
  }

}
