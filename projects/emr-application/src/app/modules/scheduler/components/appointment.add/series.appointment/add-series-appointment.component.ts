import { Component, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { AppointmentService } from '../../../service/appointment.service';

@Component({
  selector: 'series-appointment',
  templateUrl: './add-series-appointment.component.html',
  styleUrls: ['./add-series-appointment.component.css']
})
export class AddSeriesAppointmentComponent implements OnInit {
  isLoading: boolean = false;
  @Input() seriesId: number
  @Input() appointmentStrucutreType:string
  constructor(private loggedInService: LoggedInService
    , private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loggedInService.selectedClinic$.pipe(
      switchMap(clinicId => this.appointmentService.getAppointmentSerires(clinicId, this.seriesId,this.appointmentStrucutreType))
    ).subscribe(appointmentSeries => {
      console.log(JSON.stringify(appointmentSeries))
    })
  }
  compareFn = this._compareFn.bind(this);
  _compareFn(a, b) {
    return Number(a?.id) === Number(a?.id);
  }

}
