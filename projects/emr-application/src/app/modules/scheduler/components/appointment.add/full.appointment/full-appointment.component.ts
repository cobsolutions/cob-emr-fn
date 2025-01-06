import { Component, Input, OnInit } from '@angular/core';
import { filter, Observable, switchMap } from 'rxjs';
import { Patient } from '../../../../patient/models/patient';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { Appointment } from '../../../models/appointment';
import { AppointmentService } from '../../../service/appointment.service';
import { CalendarServiceService } from '../../../service/calendar/calendar-service.service';
import { InitializeAppointmentService } from '../../../service/init.appintment/initialize-appointment.service';
import { Settings } from '../../scheduler.view/util/fetch.scheduler.settings';

@Component({
  selector: 'full-appointment',
  templateUrl: './full-appointment.component.html',
  styleUrls: ['./full-appointment.component.css']
})
export class FullAppointmentComponent implements OnInit {
  @Input() patientsList: Patient[];
  appointment: Appointment = new Appointment();
  therapists$: Observable<any>
  calendars$: Observable<any>
  validDate: boolean = true
  @Input() startDate: Date;
  @Input() schedulerSettings: Observable<Settings>
  constructor(private loggedInService: LoggedInService
    , private initializeAppointmentService: InitializeAppointmentService
    , private appointmentService: AppointmentService
    , private calendarServiceService: CalendarServiceService) { }

  ngOnInit(): void {
    this.initModel()
    this.getSelectedClinic();
    this.therapists$ = this.initializeAppointmentService.findAllTherapists();
    this.schedulerSettings.subscribe((result: any) => {
      this.initializeAppointmentService.initializeAppointmentDate(this.appointment, this.startDate, result.appointmentInterval)
      this.appointmentService.appointmnetStartDate$.next(this.appointment.appointmentDate.startDate)
      this.getCalendars();
    })
  }
  onCaseSelected(selectedPatient: any) {
    this.appointment.patient = selectedPatient;
  }
  private initModel() {
    this.appointment.patient = this.patientsList[0]
    this.appointment.patientCase = this.appointment.patient.cases[0]
  }
  compareFn = this._compareFn.bind(this);
  _compareFn(a, b) {
    return a?.id === b?.id;
  }
  private getSelectedClinic() {
    this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
    ).subscribe(clinicId => {
      this.appointment.clinicId = clinicId
    })
  }
  changestartDate(startDate: Date) {
    this.appointmentService.appointmnetStartDate$.next(startDate)
  }
  getCalendars() {
    this.calendars$ = this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
      switchMap((clinicId: any) => { return this.calendarServiceService.getAttachedCalendars(clinicId) })
    )
  }
}
