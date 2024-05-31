import { Component, Input, OnInit } from '@angular/core';
import { Clinic } from '../../../../patient/models/clinic';

@Component({
  selector: 'edit-clinic',
  templateUrl: './edit-clinic.component.html',
  styleUrls: ['./edit-clinic.component.css']
})
export class EditClinicComponent implements OnInit {
  @Input() clinic: Clinic

  constructor() { }

  ngOnInit(): void {

  }
  create() {

  }
  resetError() { }
}
