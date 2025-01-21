import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { debounceTime, filter, Observable, switchMap, tap } from 'rxjs';
import { Calendar } from '../../../administration/model/calendar/calendar';
import { User } from '../../../administration/model/user/user';
import { SchedulerRepetition } from '../../../common/models/scheduler/scheduler.repetition';
import { SchedulerType } from '../../../common/models/scheduler/scheduler.type';
import { Clinic } from '../../../patient/models/clinic';
import { Patient } from '../../../patient/models/patient';
import { PatientFinderService } from '../../../patient/services/patient/patient-finder.service';
import { Appointment } from '../../models/appointment';
import { AppointmentType } from '../../models/appointment.type';
import { AppointmentService } from '../../service/appointment.service';
import { ConstructAppointmentService } from '../../service/construct.appointment/construct-appointment.service';
import { Settings } from '../scheduler.view/util/fetch.scheduler.settings';


@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})
export class AppointmentAddComponent implements OnInit {
  @ViewChild('createAppointmentForm') createAppointmentForm: NgForm;
  patientClient = new FormControl();
  filteredPatients: any;
  isLoading = false;
  @Input() startDate: Date;
  @Input() calendarId: number;
  @Input() schedulerSettings: Settings
  notValidForm: boolean = false;
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
  constructor(private patientFinderService: PatientFinderService
    , private appointmentService: AppointmentService
    , private constructAppointmentService: ConstructAppointmentService) { }
  ngOnInit() {
    this.findPatientByNameAutoComplete();

  }
  private findPatientByNameAutoComplete() {
    this.patientClient.valueChanges
      .pipe(
        filter(text => {
          if (text === undefined)
            return false;
          if (text.length > 3) {
            return true
          } else {
            this.filteredPatients = [];
            this.filteredPatients.length
            return false;
          }
        }),
        debounceTime(1000),
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
          this.filteredPatients = [];
        } else {
          this.filteredPatients = data.body;
        }
      },
        error => {
          this.isLoading = false
        });
  }
  public createAppointment() {
    this.emitCreateEvent()
    this.constructAppointmentService.constructAppointmentDate(this.appointment)
    if (this.calendarId !== null)
      this.appointment.calendarId = this.calendarId;
    return this.appointmentService.createAppointment(this.appointment)
  }
  public checkAppointmentValidity(isValid: any) {
    this.notValidForm = isValid;
  }
  private emitCreateEvent() {
    if (this.filteredPatients?.length > 0) {
      this.appointmentService.createAppointmentEvent$.next('full')
    }
    if (this.filteredPatients?.length === 0 || this.filteredPatients === undefined) {
      this.appointmentService.createAppointmentEvent$.next('block')
    }
  }
  emittedAppointment(appintment: Appointment) {
    this.appointment = appintment;
  }
}
