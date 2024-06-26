import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Clinic } from '../../../patient/models/clinic';

@Component({
  selector: 'clinic-information',
  templateUrl: './clinic-information.component.html',
  styleUrls: ['./clinic-information.component.css']
})
export class ClinicInformationComponent implements OnInit {
  @ViewChild('clinicForm') clinicForm: NgForm;
  @Input() form: FormGroup;
  clinics: Clinic[] = []
  submitted: boolean = false;
  createdClinic: Clinic = {
    name: '',
    address: {
      addressType: null,
      country: null
    }
  };
  constructor() { }

  ngOnInit(): void {
  }
  add() {
    if (this.clinicForm.valid) {
      const clinic = structuredClone(this.createdClinic)
      this.clinics.push(clinic);
      this.clinicForm.reset();
    } else {
      this.submitted = true;
    }
  }
  public getClinicAddress(clinic: Clinic): string {
    return clinic.address.firstAddress + ',' + clinic.address.state + ',' + clinic.address.country + ',' + clinic.address.zipCode;
  }
}
