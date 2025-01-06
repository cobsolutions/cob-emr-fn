import { Component, Input, OnInit } from '@angular/core';
import { filter, Observable, switchMap } from 'rxjs';
import { Clinic } from '../../../../patient/models/clinic';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { Appointment } from '../../../models/appointment';
import { AppointmentType } from '../../../models/appointment.type';
import { AppointmentService } from '../../../service/appointment.service';
import { CalendarServiceService } from '../../../service/calendar/calendar-service.service';
import { InitializeAppointmentService } from '../../../service/init.appintment/initialize-appointment.service';
import { Settings } from '../../scheduler.view/util/fetch.scheduler.settings';

@Component({
  selector: 'block-appointment',
  templateUrl: './block-appointment.component.html',
  styleUrls: ['./block-appointment.component.css']
})
export class BlockAppointmentComponent implements OnInit {
  appointment: Appointment = new Appointment();
  calendars$: Observable<any>
  @Input() startDate: Date;
  @Input() schedulerSettings: Observable<Settings>
  appointmentTypes:AppointmentType[]
  validDate: boolean = true
  selectedClinic: Clinic
  constructor(private initializeAppointmentService: InitializeAppointmentService
    , private appointmentService: AppointmentService
    , private calendarServiceService: CalendarServiceService
    , private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    this.initModel()
    this.getSelectedClinic();
    this.schedulerSettings.subscribe((result: any) => {
      this.initializeAppointmentService.initializeAppointmentDate(this.appointment, this.startDate, result.appointmentInterval)
      this.appointmentService.appointmnetStartDate$.next(this.appointment.appointmentDate.startDate)
      this.getCalendars();
    })
  }
  private initModel(){
    this.initializeAppointmentService.findAppointmnetType().subscribe(types=>{
      this.appointmentTypes = types;
      this.appointment.appointmentTypeId = types[0].id
    })
  }
  getCalendars() {
    this.calendars$ = this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
      switchMap((clinicId: any) => { return this.calendarServiceService.getAttachedCalendars(clinicId) })
    )
  }
  changestartDate(startDate: Date) {
    this.appointmentService.appointmnetStartDate$.next(startDate)
  }
  private getSelectedClinic() {
    this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
    ).subscribe(clinicId => {
      this.selectedClinic = this.loggedInService.loggedInUser.clinics
        .filter(clinic => Number(clinic.id) === Number(clinicId))[0];
      this.appointment.clinicId = clinicId
    })
  }
}
