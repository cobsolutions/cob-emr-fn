import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Clinic } from '../../../models/clinic';
import { Patient } from '../../../models/patient';
import { PatientFinderService } from '../../../services/patient/patient-finder.service';

@Component({
  selector: 'app-patient-clinic-info',
  templateUrl: './patient-clinic-info.component.html',
  styleUrls: ['./patient-clinic-info.component.css']
})
export class PatientClinicInfoComponent implements OnInit {
  @Input() patient: Patient;
  clinics: Clinic[];
  constructor(private patientFinderService: PatientFinderService) { }

  ngOnInit(): void {
    this.patientFinderService.getClinicsForPatient().subscribe(response => {
      this.clinics = response.body.records
      this.clinics.forEach(clinic => {
        if (this.patient.clinicsId.includes(Number(clinic.id)))
          clinic.selected = true;
        else
          clinic.selected = false;
      })
    })
  }
  ddd(clinicIds: any) {
    clinicIds.forEach((element: string) => {
      var clinicId: number = Number(element);
      const exists: boolean = this.patient.clinicsId?.findIndex(element => element === clinicId) > -1;
      if (!exists || this.patient.clinicsId.length === 0)
        this.patient.clinicsId.push(clinicId);
    });
    this.patient.clinicsId.forEach(element => {
      const index = clinicIds.indexOf(element);
      if (index > -1) {
        this.patient.clinicsId.splice(index, 1);
      }
    });
    console.log(clinicIds)
  }
}
