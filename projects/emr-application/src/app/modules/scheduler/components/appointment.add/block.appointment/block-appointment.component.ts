import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { Clinic } from '../../../../patient/models/clinic';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { Appointment } from '../../../models/appointment';
import { AppointmentType } from '../../../models/appointment.type';
import { FullAppointment } from '../../../models/full.appointment';
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
  @Input() mode: string
  @Input() appointmentId: string | number;
  @Output() validation = new EventEmitter<boolean>()
  @Output() createdAppointment = new EventEmitter<Appointment>()
  appointment: Appointment = new Appointment();
  calendars$: Observable<any>
  @Input() startDate: Date;
  @Input() schedulerSettings: Settings
  appointmentTypes: AppointmentType[]
  isValidDate: boolean = true
  isValidTitle: boolean = true;
  isLoading: boolean = true;
  selectedClinic: Clinic
  constructor(private initializeAppointmentService: InitializeAppointmentService
    , private appointmentService: AppointmentService
    , private calendarServiceService: CalendarServiceService
    , private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    switch (this.mode) {
      case 'create':
        this.initModel()
        this.catchAppointmentStructureType();
        this.getScehdulerSettings();
        break;
      case 'edit':
        this.getAppointmnet(this.appointmentId)
        break;
    }
    this.getSelectedClinic();


  }
  private initModel() {
    this.initializeAppointmentService.findAppointmnetType().subscribe(types => {
      this.appointmentTypes = types;
      this.appointment.appointmentTypeId = types[0].id
      this.isLoading = false;
      this.isValidTitle = true;
      this.isValidDate = true;
    })
  }
  private getAppointmnet(id: string | number) {
    this.appointmentService.retrieveAppointment(Number(id)).pipe(
      filter(appointmnet => appointmnet !== null),
    ).subscribe((appointment: FullAppointment) => {
      this.appointment = appointment
      this.initializeAppointmentService.initializeAppointmentDate(this.appointment, undefined, undefined)
      this.initializeAppointmentService.findAppointmnetType().subscribe(types => {
        this.appointmentTypes = types;
        this.appointment.appointmentTypeId = appointment.appointmentTypeId
        this.isLoading = false;
      })
    })
  }
  private catchAppointmentStructureType() {
    this.appointmentService.createAppointmentEvent$.pipe(
      filter(event => event !== null && event === 'block')
    ).subscribe(() => {
      var isNotValid: boolean = this.validate()
      if (!isNotValid)
        this.validation.emit(isNotValid);
      else {
        this.createdAppointment.emit(this.appointment)
      }
    })
  }
  private getScehdulerSettings() {
    this.initializeAppointmentService.initializeAppointmentDate(this.appointment, this.startDate, this.schedulerSettings.appointmentInterval)
    this.appointmentService.appointmnetStartDate$.next(this.appointment.appointmentDate.startDate)
    this.getCalendars();
  }
  private validate(): boolean {

    if (this.appointment.title === undefined || this.appointment.title === null || this.appointment.title === '') {
      this.isValidTitle = false;
    } else {
      this.isValidTitle = true;
    }

    this.isValidateAppointmentDate();
    return this.isValidTitle && this.isValidDate;
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
      this.selectedClinic = this.loggedInService.getLoggedUser().clinics
        .filter(clinic => Number(clinic.id) === Number(clinicId))[0];
      this.appointment.clinicId = clinicId
    })
  }
  private isValidateAppointmentDate() {
    this.isValidDate = moment(this.appointment.appointmentDate.startTime).isBefore(this.appointment.appointmentDate.endTime) &&
      (moment(this.appointment.appointmentDate.startDate).startOf('day').isBefore(this.appointment.appointmentDate.endDate))
  }
  changeStartTime(event: Date) {
    this.appointment.appointmentDate.endTime = moment(event).add(this.schedulerSettings.appointmentInterval, 'minutes').toDate();
  }
}
