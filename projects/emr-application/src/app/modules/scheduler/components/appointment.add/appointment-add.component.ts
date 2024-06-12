import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { User } from '../../../administration/model/user/user';
import { SchedulerRepetition } from '../../../common/models/scheduler/scheduler.repetition';
import { SchedulerType } from '../../../common/models/scheduler/scheduler.type';
import { Patient } from '../../../patient/models/patient';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { Appointment } from '../../models/appointment';
import { AppointmentType } from '../../models/appointment.type';
import { AppointmnetRepeat } from '../../models/repeat/appointment.repeat';
import { AppointmentService } from '../../service/appointment.service';
import { ConstructAppointmentService } from '../../service/construct.appointment/construct-appointment.service';
import { InitializeAppointmentService } from '../../service/init.appintment/initialize-appointment.service';
import { RepeatAppointmentComponent } from '../appointment.repeat/repeat-appointment.component';

export interface TreatingDoctor {
  doctorName,
  uuid: string;
}

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})
export class AppointmentAddComponent implements OnInit {
  @ViewChild('createAppointmentForm') createAppointmentForm: NgForm;
  @ViewChild('repeatAppointmentComponent') repeatAppointmentComponent: RepeatAppointmentComponent;
  @Input() startDate: Date;
  notValidForm: boolean = false;
  patient$!: Observable<Patient[]>;
  therapists$!: Observable<User[]>;
  appointmentTypes$: Observable<AppointmentType[]>;
  appointment: Appointment = new Appointment();
  appointmentType = SchedulerType;
  appointmentRepetition = SchedulerRepetition;
  startBoundary: Date;
  endBoundary: Date;
  constructor(private initializeAppointmentService: InitializeAppointmentService
    , private constructAppointmentService: ConstructAppointmentService
    , private appointmentService: AppointmentService
    , private loggedInService: LoggedInService) { }
  ngOnInit() {
    this.patient$ = this.initializeAppointmentService.findPatients()
    this.therapists$ = this.initializeAppointmentService.findTherapists();
    this.appointmentTypes$ = this.initializeAppointmentService.findAppointmnetType();
    this.initializeAppointmentService.initializeAppointmentDate(this.appointment, this.startDate)
    this.appointmentService.appointmnetStartDate$.next(this.appointment.appointmentDate.startDate)
  }
  changestartDate(startDate: Date) {
    this.appointmentService.appointmnetStartDate$.next(startDate)
  }
  pick(selectedPatient: Patient) {
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
      console.log('checkAllTherapists:YES');
    else
      console.log('checkAllTherapists:NO');
  }

  compareFn = this._compareFn.bind(this);
  _compareFn(a, b) {
    return a?.id === b?.id;
  }
  public createAppointment() {
    if (this.createAppointmentForm.valid) {
      this.notValidForm = false;
      this.constructAppointmentService.constructAppointmentDate(this.appointment)
      this.fillAppointmnetRepeat();
      this.appointment.constructTitle();
      return this.loggedInService.selectedClinic$.pipe(
        switchMap(clinicId => {
          this.appointment.clinicId = clinicId;
          return this.appointmentService.createAppointment(this.appointment)
        }),
      )
    } else {
      this.notValidForm = true;
      return EMPTY;
    }
  }
  private fillAppointmnetRepeat() {
    switch (this.appointment.appointmentRepetitionType) {
      case 'Daily':
        this.createDailyRepetitionAppointment();
        break
      case 'Weekly':
        this.createWeeklyRepetitionAppointment()
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
}
