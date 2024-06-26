import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css'],
})
export class CreateOrganizationComponent implements OnInit {

  organizationForm: FormGroup
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.organizationForm = new FormGroup({
      'Essential': new FormGroup({
        'orgname': new FormControl(null, [Validators.required]),
        'dba': new FormControl(null, [Validators.required]),
        'groupNPI': new FormControl(null, [Validators.required]),
        'taxID': new FormControl(null, [Validators.required]),
        'firstAddress': new FormControl(null, [Validators.required]),
        'secondAddress': new FormControl(null),
        'state': new FormControl(null, [Validators.required]),
        'city': new FormControl(null, [Validators.required]),
        'zipCode': new FormControl(null, [Validators.required])
      }),
      'Clinics': new FormArray([], [Validators.required]),
      'Administrator': new FormGroup({
        'firstName': new FormControl(null, [Validators.required]),
        'middleName': new FormControl(null, [Validators.required]),
        'lastName': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required]),
        'userName': new FormControl(null, [Validators.required]),
        'type': new FormControl('', [Validators.required]),
        'npi': new FormControl(null),
        'license': new FormControl(null),
      }),
      'Users': new FormArray([], [Validators.required]),
    })
  }
  nextEssential() {

  }
}
