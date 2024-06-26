import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Clinic } from '../../../patient/models/clinic';

@Component({
  selector: 'clinic-information',
  templateUrl: './clinic-information.component.html',
  styleUrls: ['./clinic-information.component.css']
})
export class ClinicInformationComponent implements OnInit {
  @Input() form: FormGroup;
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

  }
}
