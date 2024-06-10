import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, switchMap } from 'rxjs';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { AppointmentType } from '../../../models/appointment.type';
import { AppointmentTypeService } from '../../../service/appointment.type/appointment-type.service';

@Component({
  selector: 'app-appointment-type-list',
  templateUrl: './appointment-type-list.component.html',
  styleUrls: ['./appointment-type-list.component.css']
})
export class AppointmentTypeListComponent implements OnInit {
  appointmentTypes: Observable<AppointmentType[]>
  addAppointmetTypeVisibility: boolean = false;
  constructor(private appointmentTypeService: AppointmentTypeService
    , private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    this.find();
  }
  toggleAppointmentType(){
    this.addAppointmetTypeVisibility  = !this.addAppointmetTypeVisibility
  }
  create() {
  }
  edit() {

  }
  private find() {
    this.appointmentTypes = this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
      switchMap(clinicId => this.appointmentTypeService.retrieveAppointmentTypes(clinicId)),
      map((response: any) => response.records)
    )
  }
}
