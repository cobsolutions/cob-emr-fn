import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppointmentFullSeries } from '../../../models/appointment.full.series';
import { AppointmentType } from '../../../models/appointment.type';
import { InitializeAppointmentService } from '../../../service/init.appintment/initialize-appointment.service';

@Component({
  selector: 'full-series-appointment',
  templateUrl: './full-series-appointment.component.html',
  styleUrls: ['./full-series-appointment.component.css']
})
export class FullSeriesAppointmentComponent implements OnInit {
  @Input() appointmentFullSeries: AppointmentFullSeries
  startTime: Date;
  endTime: Date
  compareFn = this._compareFn.bind(this);
  therapists: any
  appointmentTypes: AppointmentType[]
  constructor(private initializeAppointmentService: InitializeAppointmentService) { }

  ngOnInit(): void {
    this.initModel();
  }
  _compareFn(a, b) {
    return Number(a?.id) === Number(b?.id);
  }
  private initModel() {
    this.appointmentFullSeries.patientCase = this.appointmentFullSeries.patientCases[0]
    this.startTime = moment.unix(this.appointmentFullSeries.startTime / 1000).toDate();
    this.endTime = moment.unix(this.appointmentFullSeries.endTime / 1000).toDate();
    this.initializeAppointmentService.findAllTherapists().subscribe(therapists => {
      this.therapists = therapists;
      this.therapists[1].selected = true
      this.appointmentFullSeries.therapy = this.appointmentFullSeries?.patientCases[0].therapistUUID
    })
    this.initializeAppointmentService.findAppointmnetType().subscribe(types => {
      this.appointmentTypes = types;
    })
  }

}
