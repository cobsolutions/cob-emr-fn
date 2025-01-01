import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clinic } from 'projects/emr-application/src/app/modules/patient/models/clinic';

@Component({
  selector: 'propmt-patient-clinics',
  templateUrl: './propmt-patient-clinics.component.html',
  styleUrls: ['./propmt-patient-clinics.component.css']
})
export class PropmtPatientClinicsComponent implements OnInit {
  clinics: Clinic[]
  constructor(@Inject(MAT_DIALOG_DATA) public data: {clinics:Clinic[]}
    , private dialogRef: MatDialogRef<PropmtPatientClinicsComponent>) { }

  ngOnInit(): void {
    this.clinics = this.data.clinics
  }
  handleClinicSelection(clinicId: string): void {
    console.log('Selected clinic ID:', clinicId);
    // Additional logic for handling the selection
  }
  cancel() {
    this.dialogRef.close(null);
  }
}
