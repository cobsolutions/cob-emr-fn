import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../administration/model/user/user';
import { SchedulerRepetition } from '../../../common/models/scheduler/scheduler.repetition';
import { SchedulerType } from '../../../common/models/scheduler/scheduler.type';
import { Patient } from '../../../patient/models/patient';
import { Appointment } from '../../models/appointment';
import { ConstructAppointmentService } from '../../service/construct.appointment/construct-appointment.service';
import { InitializeAppointmentService } from '../../service/init.appintment/initialize-appointment.service';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {
  notValidForm: boolean = false;
  patient$!: Observable<Patient[]>;
  therapists$!: Observable<User[]>;
  @Input() appointment: Appointment;
  appointmentType = SchedulerType;
  appointmentRepetition = SchedulerRepetition;
  constructor(private initializeAppointmentService: InitializeAppointmentService
    , private constructAppointmentService: ConstructAppointmentService) { }

  ngOnInit(): void {
    this.patient$ = this.initializeAppointmentService.findPatients()
    this.therapists$ = this.initializeAppointmentService.findTherapists();
    this.initializeAppointmentService.initializeAppointmentDate(this.appointment)
    this.constructAppointmentService.constructAppointmentPatient(this.appointment)
    
  }
  pick(selectedPatient: Patient) {
    this.appointment.patientId = selectedPatient.id;
  }
  unpick(event: any) {
    this.appointment.patientId = null;
  }
  compareFn = this._compareFn.bind(this);
  _compareFn(a, b) {
    return a?.id === b?.id;
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
}
