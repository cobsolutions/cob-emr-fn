import { Component, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { AppointmentBlockSeries } from '../../../models/appointment.block.series';
import { AppointmentFullSeries } from '../../../models/appointment.full.series';
import { AppointmentService } from '../../../service/appointment.service';

@Component({
  selector: 'series-appointment',
  templateUrl: './add-series-appointment.component.html',
  styleUrls: ['./add-series-appointment.component.css']
})
export class AddSeriesAppointmentComponent implements OnInit {
  isLoading: boolean = true;
  @Input() seriesId: number
  @Input() appointmentStrucutreType: string
  appointmentFullSeries: AppointmentFullSeries
  appointmentBlockSeries: AppointmentBlockSeries
  constructor(private loggedInService: LoggedInService
    , private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loggedInService.selectedClinic$.pipe(
      switchMap(clinicId => this.appointmentService.getAppointmentSerires(clinicId, this.seriesId, this.appointmentStrucutreType))
    ).subscribe(appointmentSeries => {
      switch (this.appointmentStrucutreType) {
        case 'Block':
          this.appointmentBlockSeries = appointmentSeries;
          this.appointmentFullSeries = undefined
          break;
        case 'Full':
          this.appointmentFullSeries = appointmentSeries
          this.appointmentBlockSeries  = undefined
          break;
      }
      this.isLoading = false;
      console.log(JSON.stringify(appointmentSeries))
    })
  }

}
