import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { PateintResponse } from '../../models/response/patient.response';
import { PatientFinderService } from '../../services/patient/patient-finder.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  patientId: number;
  patient: any
  constructor(private route: ActivatedRoute, private patientFinderService: PatientFinderService, private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('patientId'))
    console.log(this.patientId)
    this.loggedInService.selectedClinic$
      .pipe(
        filter(clinicId => clinicId != null),
        switchMap((clinicId) => this.patientFinderService.getPatient(this.patientId, clinicId)))
      .subscribe((response: PateintResponse) => {
        this.patient = response.records
        console.log(JSON.stringify(this.patient))
      }, error => {
      })
  }




  deleteAddress(_t22: number) {
    throw new Error('Method not implemented.');
  }
  addAddress() {
    throw new Error('Method not implemented.');
  }
  deleteContact(_t32: number) {
    throw new Error('Method not implemented.');
  }
  addContact() {
    throw new Error('Method not implemented.');
  }
  deleteIdentification(_t42: number) {
    throw new Error('Method not implemented.');
  }
  addIdentification() {
    throw new Error('Method not implemented.');
  }
  deleteInsurance(_t52: number) {
    throw new Error('Method not implemented.');
  }
  addInsurance() {
    throw new Error('Method not implemented.');
  }
  deleteCase(_t62: number) {
    throw new Error('Method not implemented.');
  }
  addCase() {
    throw new Error('Method not implemented.');
  }
  deleteClinic(_t72: number) {
    throw new Error('Method not implemented.');
  }
  addClinic() {
    throw new Error('Method not implemented.');
  }
}
