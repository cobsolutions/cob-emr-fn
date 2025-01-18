import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { PatientCase } from '../../../../patient/models/case/patient.case';
import { Clinic } from '../../../../patient/models/clinic';
import { Patient } from '../../../../patient/models/patient';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { Appointment } from '../../../models/appointment';
import { AppointmentType } from '../../../models/appointment.type';
import { FullAppointment } from '../../../models/full.appointment';
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
  @Input() mode: string
  @Input() appointmentId: string | number;
  @Output() validation = new EventEmitter<boolean>()
  @Output() createdAppointment = new EventEmitter<Appointment>()
  @ViewChild('repeatAppointmentComponent') repeatAppointmentComponent: RepeatAppointmentComponent;
  @Input() patientsList: Patient[];
  appointment: Appointment = new Appointment();
  therapists: any
  calendars$: Observable<any>
  appointmentTypes: AppointmentType[]
  validDate: boolean = true;
  isLoading: boolean = true;
  @Input() startDate: Date;
  @Input() schedulerSettings: Settings
  /*
    NEW Objects
  */
  selectedPateint: Patient;
  selectedPatientCase: PatientCase
  selectedClinic: Clinic;
  constructor(private loggedInService: LoggedInService
    , private initializeAppointmentService: InitializeAppointmentService
    , private appointmentService: AppointmentService
    , private calendarServiceService: CalendarServiceService) { }

  ngOnInit(): void {
    switch (this.mode) {
      case 'create':
        this.initModel()
        this.catchAppointmentStructureType();
        this.getScehdulerSettings();
        break;
      case 'edit':
        this.getAppointmnet(this.appointmentId);
        break;
    }
    this.getSelectedClinic();


  }
  private initModel() {
    this.selectedPateint = this.patientsList[0]
    this.selectedPatientCase = this.selectedPateint.cases[0]
    this.selectPatientClinic();
    this.initializeAppointmentService.findAllTherapists().subscribe(therapists => {
      this.therapists = therapists;
      this.therapists[1].selected = true
      //this.appointment.therapyUUID = this.therapists[0].uuid;
      this.appointment.therapyUUID = this.selectedPateint.cases[0].therapistUUID
    })
    this.initializeAppointmentService.findAppointmnetType().subscribe(types => {
      this.appointmentTypes = types;
      this.appointment.appointmentTypeId = types[0].id
    })
    this.isLoading = false;
  }
  private getScehdulerSettings() {
    this.initializeAppointmentService.initializeAppointmentDate(this.appointment, this.startDate, this.schedulerSettings.appointmentInterval)
    this.appointmentService.appointmnetStartDate$.next(this.appointment.appointmentDate.startDate)
    this.getCalendars();
  }
  private getAppointmnet(id: string | number) {
    this.appointmentService.retrieveFullAppointment(Number(id)).pipe(
      filter(appointmnet => appointmnet !== null),
    ).subscribe((appointment: FullAppointment) => {
      this.appointment = appointment
      this.selectedPateint = appointment.patient;
      this.selectedPatientCase = appointment.patientCase;
      this.initializeAppointmentService.findAllTherapists().subscribe(therapists => {
        this.therapists = therapists;
        this.appointment.therapyUUID = appointment.therapyUUID;
      })
      this.initializeAppointmentService.findAppointmnetType().subscribe(types => {
        this.appointmentTypes = types;
        this.appointment.appointmentTypeId = appointment.appointmentTypeId;
      })
      this.selectPatientClinic();
      this.initializeAppointmentService.initializeAppointmentDate(this.appointment, undefined, this.schedulerSettings.appointmentInterval)
      this.appointmentService.appointmnetStartDate$.next(this.appointment.appointmentDate.startDate)
      this.getCalendars();
      this.isLoading = false;
    })
  }
  private catchAppointmentStructureType() {
    this.appointmentService.createAppointmentEvent$.pipe(
      filter(event => event !== null && event === 'full')
    ).subscribe(() => {
      this.isValidateAppointmentDate();
      this.validation.emit(!this.validDate);
      if (this.validDate) {
        this.createAppointmentModel();
        this.createdAppointment.emit(this.appointment)
      }
    })
  }
  compareFn = this._compareFn.bind(this);
  _compareFn(a, b) {
    return Number(a?.id) === Number(a?.id);
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
  private isValidateAppointmentDate() {
    this.validDate = moment(this.appointment.appointmentDate.startTime).isBefore(this.appointment.appointmentDate.endTime) &&
      (moment(this.appointment.appointmentDate.startDate).startOf('day').isBefore(this.appointment.appointmentDate.endDate))
  }
  private selectPatientClinic() {
    if (this.selectedPateint.clinicModels.length > 1) {
      this.loggedInService.selectedClinic$.pipe(
        filter(clinicId => clinicId !== null),
        tap(clinicid => console.log(clinicid))
      ).subscribe(clinicId => {
        this.selectedClinic = this.selectedPateint.clinicModels
          .filter(clinic => {
            return Number(clinic.id) === Number(clinicId)
          })[0]
      })
    } else {
      this.selectedClinic = this.selectedPateint.clinicModels[0]
    }
    if (this.mode === 'edit') {
      this.selectedClinic = this.selectedPateint.clinicModels
        .filter(clinic => Number(clinic.id) === this.appointment.clinicId)[0]
    }
  }
  private createAppointmentModel() {
    this.appointment.patientId = this.selectedPateint.id;
    this.appointment.patientCaseId = this.selectedPatientCase.id
    console.log(JSON.stringify(this.selectedClinic))
    this.appointment.clinicId = Number(this.selectedClinic.id);
    this.appointment.title = this.selectedPateint.lastName + "," + this.selectedPateint.firstName + ":" + this.selectedPatientCase.title
  }
  changePatient() {
    this.selectedPatientCase = this.selectedPateint.cases[0]
    this.selectedClinic = this.selectedPateint.clinicModels[0]
  }
  changeStartTime(event: Date) {
    this.appointment.appointmentDate.endTime = moment(event).add(this.schedulerSettings.appointmentInterval, 'minutes').toDate();
  }
  public checkValididityForEdit(): boolean {
    this.isValidateAppointmentDate();
    return this.validDate;
  }
}
