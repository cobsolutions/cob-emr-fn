import { Component, Input, OnInit } from '@angular/core';
import { Clinic } from 'projects/emr-application/src/app/modules/patient/models/clinic';

@Component({
  selector: 'propmt-patient-clinics',
  templateUrl: './propmt-patient-clinics.component.html',
  styleUrls: ['./propmt-patient-clinics.component.css']
})
export class PropmtPatientClinicsComponent implements OnInit {
  @Input() clinics: Clinic[]
  constructor() { }

  ngOnInit(): void {
  }
  handleClinicSelection(clinicId: string): void {
    console.log('Selected clinic ID:', clinicId);
    // Additional logic for handling the selection
  }
}
