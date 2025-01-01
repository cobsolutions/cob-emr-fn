import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Clinic } from 'projects/emr-application/src/app/modules/patient/models/clinic';
import { LoggedInService } from 'projects/emr-application/src/app/modules/security/service/loggedIn/logged-in.service';

@Component({
  selector: 'propmt-patient-clinics',
  templateUrl: './propmt-patient-clinics.component.html',
  styleUrls: ['./propmt-patient-clinics.component.css']
})
export class PropmtPatientClinicsComponent implements OnInit {
  clinics: Clinic[]
  constructor(@Inject(MAT_DIALOG_DATA) public data: { clinics: Clinic[], patient: number }
    , private dialogRef: MatDialogRef<PropmtPatientClinicsComponent>
    , private loggedInService: LoggedInService
    , private router: Router) { }

  ngOnInit(): void {
    this.clinics = this.data.clinics
  }
  handleClinicSelection(clinicId: string): void {
    this.loggedInService.selectedClinic$.next(Number(clinicId))
    this.loggedInService.changeSelectedClinic$.next(Number(clinicId))
    this.router.navigate(['emr/patient/chart/patientId/' + this.data.patient]);
    this.dialogRef.close(null);
  }
  cancel() {
    this.dialogRef.close(null);
  }
}
