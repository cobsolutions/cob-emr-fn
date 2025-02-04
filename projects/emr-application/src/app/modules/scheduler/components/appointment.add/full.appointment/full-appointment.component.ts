import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { filter, forkJoin, map, Observable, switchMap } from 'rxjs';
import { PatientCase } from '../../../../patient/models/case/patient.case';
import { Clinic } from '../../../../patient/models/clinic';
import { Patient } from '../../../../patient/models/patient';
import { PatientFinderService } from '../../../../patient/services/patient/patient-finder.service';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { Appointment } from '../../../models/appointment';
import { AppointmentType } from '../../../models/appointment.type';
import { AppointmentRepetitionConfiguration } from '../../../models/repeat/appointment.repetition.configuration';
import { AppointmentService } from '../../../service/appointment.service';
import { InitializeAppointmentService } from '../../../service/init.appintment/initialize-appointment.service';
import { SchedulerConfigurationService } from '../../../service/scheduler-configuration.service';
import { RepeatAppointmentComponent } from '../../appointment.repeat/repeat-appointment.component';
import { Settings } from '../../scheduler.view/util/fetch.scheduler.settings';

@Component({
  selector: 'full-appointment',
  templateUrl: './full-appointment.component.html',
  styleUrls: ['./full-appointment.component.css']
})
export class FullAppointmentComponent implements OnInit {
  @Input() module: string
  @Input() mode: string
  @Input() appointmentId: string | number;
  @Output() validation = new EventEmitter<boolean>()
  @ViewChild('repeatAppointmentComponent') repeatAppointmentComponent: RepeatAppointmentComponent;
  @Input() patientsList: Patient[];
  appointment: Appointment = new Appointment();
  therapists: any
  calendars$: Observable<any>
  calendars: any
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
    , private schedulerConfigurationService: SchedulerConfigurationService
    , private patientService: PatientFinderService) { }

  ngOnInit(): void {
    switch (this.mode) {
      case 'create':
        this.initModel()
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
      this.appointment.therapyUUID = this.selectedPateint.cases[0].therapistUUID
    })
    this.initializeAppointmentService.findAppointmnetType().subscribe(types => {
      this.appointmentTypes = types;
      this.appointment.appointmentTypeId = types[0].id
    })
    this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
      switchMap((clinicId: any) => {
        return this.schedulerConfigurationService
          .findCalendarsBySchedulerUserSettings(clinicId, this.loggedInService.getLoggedUser().uuid)
      })
    ).subscribe(result => {
      this.calendars = result
      this.appointment.calendarId = result[0].id
    })

    this.isLoading = false;
  }
  private getScehdulerSettings() {
    this.initializeAppointmentService.initializeAppointmentDate(this.appointment, this.startDate, this.schedulerSettings.appointmentInterval)
  }
  private getAppointmnet(id: string | number) {
    this.appointmentService.retrieveFullAppointment(Number(id)).pipe(
      switchMap((appointment) => {
        return forkJoin({
          patient: this.appointmentService.findAppointmentPatient(Number(id)),
          patientCase: this.appointmentService.findAppointmentPatientCase(Number(id)),
        }).pipe(
          map((details) => ({
            appointment,
            details,
          }))
        );
      })
    ).subscribe(result => {
      this.appointment = result.appointment
      this.selectedPateint = result.details.patient;
      this.selectedPatientCase = result.details.patientCase
      this.initializeAppointmentService.findAllTherapists().subscribe(therapists => {
        this.therapists = therapists;
        this.appointment.therapyUUID = result.appointment.therapyUUID;
      })
      this.initializeAppointmentService.findAppointmnetType().subscribe(types => {
        this.appointmentTypes = types;
        this.appointment.appointmentTypeId = result.appointment.appointmentTypeId;
      })
      this.selectPatientClinic();
      this.initializeAppointmentService.initializeAppointmentDate(this.appointment, undefined, this.schedulerSettings.appointmentInterval)
      this.isLoading = false;
    })
  }

  compareFn = this._compareFn.bind(this);
  _compareFn(a, b) {
    return Number(a?.id) === Number(b?.id);
  }
  private getSelectedClinic() {
    this.loggedInService.selectedClinic$.pipe(
      filter((clinicId) => clinicId != null),
    ).subscribe(clinicId => {
      this.appointment.clinicId = clinicId
    })
  }
  private fillAppointmnetRepeat() {
    switch (this.appointment.appointmentRepetitionConfiguration.appointmentRepetitionType) {
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
      default:
        this.appointment.appointmentRepetitionConfiguration = {
          appointmentRepetitionType: null
        }
        break

    }
  }
  private createDailyRepetitionAppointment() {
    var dailyAppointmnetRepeat: AppointmentRepetitionConfiguration = {
      appointmentRepetitionType: this.appointment.appointmentRepetitionConfiguration.appointmentRepetitionType,
      daily: this.repeatAppointmentComponent.dailyRepeatAppointment
    }
    this.appointment.appointmentRepetitionConfiguration = dailyAppointmnetRepeat
  }
  private createWeeklyRepetitionAppointment() {
    var weeklyAppointmnetRepeat: AppointmentRepetitionConfiguration = {
      appointmentRepetitionType: this.appointment.appointmentRepetitionConfiguration.appointmentRepetitionType,
      weekly: this.repeatAppointmentComponent.weeklyRepeatAppointment
    }
    this.appointment.appointmentRepetitionConfiguration = weeklyAppointmnetRepeat
  }
  private createMonthlyRepetitionAppointment() {
    var monthlyAppointmnetRepeat: AppointmentRepetitionConfiguration = {
      appointmentRepetitionType: this.appointment.appointmentRepetitionConfiguration.appointmentRepetitionType,
      monthly: this.repeatAppointmentComponent.monthlyRepeatAppointment
    }
    this.appointment.appointmentRepetitionConfiguration = monthlyAppointmnetRepeat
  }
  private createYearlyRepetitionAppointment() {
    var yearlyAppointmnetRepeat: AppointmentRepetitionConfiguration = {
      appointmentRepetitionType: this.appointment.appointmentRepetitionConfiguration.appointmentRepetitionType,
      yearly: this.repeatAppointmentComponent.yearlyRepeatAppointment
    }
    this.appointment.appointmentRepetitionConfiguration = yearlyAppointmnetRepeat
  }
  private isValidateAppointmentDate() {
    const start = moment(this.appointment.appointmentDate.startDate);
    const end = moment(this.appointment.appointmentDate.endDate);
    this.validDate = !start.isAfter(end);
  }
  private selectPatientClinic() {
    if (this.selectedPateint.clinicModels.length > 1) {
      this.loggedInService.selectedClinic$.pipe(
        filter(clinicId => clinicId !== null),
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
  changePatient() {
    this.selectedPatientCase = this.selectedPateint.cases[0]
    this.selectedClinic = this.selectedPateint.clinicModels[0]
  }
  changestartDate(startDate: Date) {
    if (this.appointment.appointmentRepetitionConfiguration.appointmentRepetitionType !== null)
      this.appointment.appointmentDate.endDate = startDate;
    this.appointmentService.appointmnetStartDate$.next(startDate)
  }
  changeEndDate(endDate: Date) {
    if (this.appointment.appointmentRepetitionConfiguration.appointmentRepetitionType !== null)
      this.appointment.appointmentDate.startDate = endDate;
  }
  changeStartTime(event: Date) {
    this.appointment.appointmentDate.endTime = moment(event).add(this.schedulerSettings.appointmentInterval, 'minutes').toDate();
  }
  public checkValididityForEdit(): boolean {
    this.isValidateAppointmentDate();
    return this.validDate;
  }
  public returnAppointment() {
    this.isValidateAppointmentDate();
    if (!this.validDate)
      return undefined
    else {
      this.createAppointmentModel();
      this.fillAppointmnetRepeat();
      return this.appointment
    }
  }
  private createAppointmentModel() {
    this.appointment.patientId = this.selectedPateint.id;
    this.appointment.patientCaseId = this.selectedPatientCase.id
    this.appointment.clinicId = Number(this.selectedClinic.id);
    this.appointment.title = this.selectedPateint.lastName + "," + this.selectedPateint.firstName + ":" + this.selectedPatientCase.title
  }
  changeAppointmentRepetition() {
    if (this.appointment.appointmentRepetitionConfiguration.appointmentRepetitionType !== null)
      this.appointment.appointmentDate.endDate = this.appointment.appointmentDate.startDate;
  }
}
