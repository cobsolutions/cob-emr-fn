import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { GenerateRandomValue } from 'projects/emr-application/src/app/util/generate.random';
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
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  add() {
    if (this.clinicForm.valid) {
      const clinic = structuredClone(this.createdClinic)
      this.clinics.push(clinic);
      this.pushClinicToForm(clinic);
      this.clinicForm.reset();
    } else {
      this.submitted = true;
    }
  }
  public getClinicAddress(clinic: Clinic): string {
    return clinic.address.firstAddress + ',' + clinic.address.state + ',' + clinic.address.country + ',' + clinic.address.zipCode;
  }
  private pushClinicToForm(clinic: Clinic) {
    const addedClinic = this.fb.group({
      name: [clinic.name],
      address: [this.getClinicAddress(clinic)],
      generatedId: [GenerateRandomValue.generateNumber(1,20)]
    });
    this.organizationClinics.push(addedClinic);

  }
  get organizationClinics(): FormArray {
    return this.form.get('clinics') as FormArray;
  }
  public remove(index: number) {

  }
}
