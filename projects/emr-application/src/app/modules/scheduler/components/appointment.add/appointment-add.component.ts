import { JsonPipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { debounceTime, EMPTY, filter, finalize, Observable, switchMap, tap } from 'rxjs';
import { Calendar } from '../../../administration/model/calendar/calendar';
import { User } from '../../../administration/model/user/user';
import { SchedulerRepetition } from '../../../common/models/scheduler/scheduler.repetition';
import { SchedulerType } from '../../../common/models/scheduler/scheduler.type';
import { Clinic } from '../../../patient/models/clinic';
import { Patient } from '../../../patient/models/patient';
import { PatientFinderService } from '../../../patient/services/patient/patient-finder.service';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { SchedulerSettings } from '../../model/shceduler.date.settings';
import { Appointment } from '../../models/appointment';
import { AppointmentType } from '../../models/appointment.type';
import { AppointmnetRepeat } from '../../models/repeat/appointment.repeat';
import { AppointmentService } from '../../service/appointment.service';
import { CalendarServiceService } from '../../service/calendar/calendar-service.service';
import { ConstructAppointmentService } from '../../service/construct.appointment/construct-appointment.service';
import { InitializeAppointmentService } from '../../service/init.appintment/initialize-appointment.service';
import { RepeatAppointmentComponent } from '../appointment.repeat/repeat-appointment.component';
import { Settings } from '../scheduler.view/util/fetch.scheduler.settings';

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
  patientClient = new FormControl();
  filteredPatients: any;
  isLoading = false;
  @Input() startDate: Date;
  @Input() calendarId: number;
  @Input() schedulerSettings: Observable<Settings>
  notValidForm: boolean = false;
  validDate: boolean = true
  patient$!: Observable<Patient[]>;
  therapists$!: Observable<User[]>;
  patientClinics$!: Observable<Clinic[]>;
  appointmentTypes$: Observable<AppointmentType[]>;
  appointment: Appointment = new Appointment();
  appointmentType = SchedulerType;
  appointmentRepetition = SchedulerRepetition;
  startBoundary: Date;
  endBoundary: Date;
  calendars$!: Observable<Calendar[]>;
  selectedClinic?: number;
  constructor(private patientFinderService: PatientFinderService) { }
  ngOnInit() {
    this.findPatientByNameAutoComplete();

  }
  private findPatientByNameAutoComplete() {
    this.patientClient.valueChanges
      .pipe(
        filter(text => {
          if (text === undefined)
            return false;
          if (text.length > 0) {
            return true
          } else {
            this.filteredPatients = [];
            this.filteredPatients.length
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {
          this.filteredPatients = [];
          this.isLoading = true;
        }),
        switchMap((value) => {
          return this.patientFinderService.getPatientsByName(value)
        }
        )
      )
      .subscribe(data => {
        this.isLoading = false
        if (data == undefined) {
          console.log('No Data')
          this.filteredPatients = [];
        } else {
          this.filteredPatients = data.body;
        }
      },
        error => {
          this.isLoading = false
        });
  }
  public createAppointment():Observable<any> {
    return EMPTY;
  }
  
}
