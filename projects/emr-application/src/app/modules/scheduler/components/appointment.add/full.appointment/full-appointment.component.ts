import { Component, Input, OnInit } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Patient } from '../../../../patient/models/patient';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { Appointment } from '../../../models/appointment';
import { InitializeAppointmentService } from '../../../service/init.appintment/initialize-appointment.service';

@Component({
  selector: 'full-appointment',
  templateUrl: './full-appointment.component.html',
  styleUrls: ['./full-appointment.component.css']
})
export class FullAppointmentComponent implements OnInit {
  @Input() patientsList:Patient[];
  appointment:Appointment= new Appointment();
  therapists$: Observable<any>
  constructor(private loggedInService: LoggedInService
    ,private initializeAppointmentService: InitializeAppointmentService) { }

  ngOnInit(): void {
    this.initModel()
    this.getSelectedClinic();
    this.therapists$ = this.initializeAppointmentService.findAllTherapists();
  }
  onCaseSelected(selectedPatient:any){
    this.appointment.patient = selectedPatient;
  }
  private initModel(){
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
}
