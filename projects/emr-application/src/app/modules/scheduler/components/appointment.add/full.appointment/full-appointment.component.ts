import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../../../../patient/models/patient';
import { Appointment } from '../../../models/appointment';

@Component({
  selector: 'full-appointment',
  templateUrl: './full-appointment.component.html',
  styleUrls: ['./full-appointment.component.css']
})
export class FullAppointmentComponent implements OnInit {
  @Input() patientsList:Patient[];
  appointment:Appointment= new Appointment();
  constructor() { }

  ngOnInit(): void {
    this.initModel()
  }
  onCaseSelected(p:any){
    console.log(JSON.stringify(p))
  }
  private initModel(){
    this.appointment.patient = this.patientsList[0]
    this.appointment.patientCase = this.appointment.patient.cases[0]
  }
  compareFn = this._compareFn.bind(this);
  _compareFn(a, b) {
    return a?.id === b?.id;
  }
}
