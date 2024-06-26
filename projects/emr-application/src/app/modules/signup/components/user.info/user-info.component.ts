import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Clinic } from '../../../patient/models/clinic';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  @Input() form: FormGroup;

  clinics: Observable<Clinic[]>
  constructor() { }

  ngOnInit(): void {
    var formClinics = this.form.get('Clinics') as FormArray
    this.clinics = formClinics.valueChanges
  }
  get organizationusers(): FormArray {
    return this.form.get('Users') as FormArray;
  }

}
