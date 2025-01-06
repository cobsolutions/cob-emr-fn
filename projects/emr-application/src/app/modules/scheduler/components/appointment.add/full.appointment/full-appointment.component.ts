import { Component, Input, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { Patient } from '../../../../patient/models/patient';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { Appointment } from '../../../models/appointment';

@Component({
  selector: 'full-appointment',
  templateUrl: './full-appointment.component.html',
  styleUrls: ['./full-appointment.component.css']
})
export class FullAppointmentComponent implements OnInit {
  @Input() patientsList:Patient[];
  appointment:Appointment= new Appointment();
  constructor(private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    this.initModel()
    this.getSelectedClinic();
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
