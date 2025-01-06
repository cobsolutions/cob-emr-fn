import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { filter, Observable, switchMap } from 'rxjs';
import { Patient } from '../../../../patient/models/patient';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { Appointment } from '../../../models/appointment';
import { AppointmnetRepeat } from '../../../models/repeat/appointment.repeat';
import { AppointmentService } from '../../../service/appointment.service';
import { CalendarServiceService } from '../../../service/calendar/calendar-service.service';
import { InitializeAppointmentService } from '../../../service/init.appintment/initialize-appointment.service';
import { RepeatAppointmentComponent } from '../../appointment.repeat/repeat-appointment.component';
import { Settings } from '../../scheduler.view/util/fetch.scheduler.settings';

@Component({
  selector: 'full-appointment',
  templateUrl: './full-appointment.component.html',
  styleUrls: ['./full-appointment.component.css']
})
export class FullAppointmentComponent implements OnInit {
  @ViewChild('repeatAppointmentComponent') repeatAppointmentComponent: RepeatAppointmentComponent;
  @Input() patientsList: Patient[];
  appointment: Appointment = new Appointment();
  therapists: any
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
    this.schedulerSettings.subscribe((result: any) => {
      this.initializeAppointmentService.initializeAppointmentDate(this.appointment, this.startDate, result.appointmentInterval)
      this.appointmentService.appointmnetStartDate$.next(this.appointment.appointmentDate.startDate)
      this.getCalendars();
    })
    this.appointmentService.createAppointmentEvent$.pipe(
      filter(event => event !== null && event === 'full')
    ).subscribe(() => {
      console.log('############# - block')
    })
  }
  onCaseSelected(selectedPatient: any) {
    this.appointment.patient = selectedPatient;
  }
  private initModel() {
    this.appointment.patient = this.patientsList[0]
    this.appointment.patientCase = this.appointment.patient.cases[0]
    this.initializeAppointmentService.findAllTherapists().subscribe(therapists => {
      console.log(JSON.stringify(therapists))
      this.therapists = therapists;
      this.appointment.therapyUUID = this.therapists[0].uuid;
    })
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
  private fillAppointmnetRepeat() {
    switch (this.appointment.appointmentRepetitionType) {
      case 'Daily':
        this.createDailyRepetitionAppointment();
        break
      case 'Weekly':
        this.createWeeklyRepetitionAppointment()
        break;
      case 'Monthly':
        this.createMonthlyRepetitionAppointment()
        break;
      case 'Yearly':
        this.createYearlyRepetitionAppointment();
        break;
    }
  }
  private createDailyRepetitionAppointment() {
    var dailyAppointmnetRepeat: AppointmnetRepeat = {
      type: this.appointment.appointmentRepetitionType,
      daily: this.repeatAppointmentComponent.dailyRepeatAppointment
    }
    this.appointment.appointmentRepeat = dailyAppointmnetRepeat
  }
  private createWeeklyRepetitionAppointment() {
    var weeklyAppointmnetRepeat: AppointmnetRepeat = {
      type: this.appointment.appointmentRepetitionType,
      weekly: this.repeatAppointmentComponent.weeklyRepeatAppointment
    }
    this.appointment.appointmentRepeat = weeklyAppointmnetRepeat
  }
  private createMonthlyRepetitionAppointment() {
    var monthlyAppointmnetRepeat: AppointmnetRepeat = {
      type: this.appointment.appointmentRepetitionType,
      monthly: this.repeatAppointmentComponent.monthlyRepeatAppointment
    }
    this.appointment.appointmentRepeat = monthlyAppointmnetRepeat
  }
  private createYearlyRepetitionAppointment() {
    var yearlyAppointmnetRepeat: AppointmnetRepeat = {
      type: this.appointment.appointmentRepetitionType,
      yearly: this.repeatAppointmentComponent.yearlyRepeatAppointment
    }
    this.appointment.appointmentRepeat = yearlyAppointmnetRepeat
  }
}
