import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { User } from '../../../administration/model/user/user';
import { ClinicalUserService } from '../../../administration/services/user/clinical.user/clinical-user.service';
import { DotorUserService } from '../../../administration/services/user/doctor.user/dotor-user.service';
import { SchedulerRepetition } from '../../../common/models/enums/scheduler/scheduler.repetition';
import { SchedulerType } from '../../../common/models/enums/scheduler/scheduler.type';
import { ClinicEmittingService } from '../../../common/service/emitting/clinic-emitting.service';
import { Patient } from '../../../patient/models/patient';
import { Appointment } from '../../models/appointment';
import { AppointmentRepeat } from '../../models/appointment.repeat';
import { AppointmentEmittingService } from '../../service/appointment-emitting.service';
import { AppointmentService } from '../../service/appointment.service';
import { PatientAppointmentService } from '../../service/patient-appointment.service';

export interface TreatingDoctor {
  doctorName,
  uuid: string;
}
export interface days {
  dayName: string,
  dayNumber: number
}
@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})
export class AppointmentAddComponent implements OnInit {
  @ViewChild('appontmentForm') appontmentForm: NgForm;
  @Input() startDate: Date;
  @Input() iscreate: boolean;
  submitted: boolean = false;
  patient$!: Observable<Patient[]>;
  therapists$!: Observable<User[]>;
  appointment: Appointment = new Appointment();
  isAllTherapists: boolean = false;
  appointmentType = SchedulerType;
  appointmentRepetition = SchedulerRepetition;
  addAppointmentVisibility = false;
  weekDays: days[] = [
    {
      dayName: 'Mon', dayNumber: 2
    },
    {
      dayName: 'Tue', dayNumber: 3
    },
    {
      dayName: 'Wed', dayNumber: 4
    },
    {
      dayName: 'Thu', dayNumber: 5
    },
    {
      dayName: 'Fri', dayNumber: 6
    },
    {
      dayName: 'Sat', dayNumber: 7
    },
    {
      dayName: 'Sun', dayNumber: 1
    },
  ]
  appointmentRepeat: AppointmentRepeat = new AppointmentRepeat();
  startBoundary: Date;
  endBoundary: Date;
  constructor(private appointmentService: AppointmentService
    , private patientAppointmentService: PatientAppointmentService
    , private clinicEmittingService: ClinicEmittingService
    , private appointmentEmittingService: AppointmentEmittingService
    , private clinicalUserService: DotorUserService) { }
  ngOnInit() {
    this.initAppointmentDate();
    this.patient$ = this.clinicEmittingService.selectedClinic$.pipe(
      tap(clinicId => { this.appointment.clinicId = clinicId }),
      switchMap(clinicId => this.patientAppointmentService.getPateint(clinicId)),
      filter(patients => patients !== null),
      map(response => {
        return response;
      })
    )
    this.therapists$ = this.clinicEmittingService.selectedClinic$.pipe(
      switchMap(clinicId => this.clinicalUserService.getAllClinicalsUsersByClinic(clinicId)),
      filter(therapists => therapists !== null),
      map(response => {
        return response;
      })
    )
    if (!this.iscreate)
      this.appointmentEmittingService.selectedAppointment$.pipe(
        filter((appointmentId) => appointmentId !== null),
        switchMap((appointmentId) => this.appointmentService.retrieveAppointment(appointmentId))
      ).subscribe((result) => {
        this.populateAppointment(result)
      })
  }
  populateAppointment(appointment: Appointment) {
    var start: Date = moment.unix(appointment.startDate / 1000).toDate();
    var end: Date = moment.unix(appointment.endDate / 1000).toDate()
    this.appointment.id = appointment.id
    this.appointment.appointmentDate.startDate = start;
    this.appointment.appointmentDate.startTime = start;
    this.appointment.appointmentDate.endDate = end;
    this.appointment.appointmentDate.endTime = end;;
    this.appointment.appointmentType = appointment.appointmentType;
    this.appointment.patient = appointment.patient
    this.appointment.patient.fullName = appointment.title.split(':')[0]
    this.appointment.patientId = appointment.patientId;
    this.appointment.patientCase = { id: appointment.patientCaseId }
    this.appointment.patientCaseId = appointment.patientCaseId;
    this.appointment.note = appointment.note;
    this.appointment.appointmentStatus = appointment.appointmentStatus;
    this.appointment.therapyUUID = appointment.therapyUUID
    this.appointment.appointmentRepetition = appointment.appointmentRepetition;
  }
  initAppointmentDate() {
    this.appointment.appointmentDate.startDate = this.startDate;
    this.appointment.appointmentDate.startTime = moment(this.startDate).set("hour", 8).set("minute", 0).toDate();;
    this.appointment.appointmentDate.endDate = moment(this.appointment.appointmentDate.startDate).toDate();
    this.appointment.appointmentDate.endTime = moment(this.appointment.appointmentDate.startTime).add(30, 'minutes').toDate()
  }
  pick(selectedPatient: Patient) {
    console.log(selectedPatient)
    this.appointment.patientId = selectedPatient.id;
  }
  unpick(event: any) {
    this.appointment.patientId = null;
  }
  onCaseSelected(selectedCase: any) {
    this.appointment.patientCaseId = selectedCase.id;
  }
  checkAllTherapists(event: any) {
    if (event.currentTarget.checked)
      this.therapists$ = this.clinicalUserService.getAllClinicalsUsers().pipe(
        filter(therapists => therapists !== null),
        map(response => {
          return response;
        })
      )
    else
      this.therapists$ = this.clinicEmittingService.selectedClinic$.pipe(
        switchMap(clinicId => this.clinicalUserService.getAllClinicalsUsersByClinic(clinicId)),
        filter(therapists => therapists !== null),
        map(response => {
          return response;
        })
      )
  }
  toggleAddAppointment() {
    this.addAppointmentVisibility = !this.addAppointmentVisibility;
  }

  compareFn = this._compareFn.bind(this);
  _compareFn(a, b) {
    return a?.id === b?.id;
  }
}
