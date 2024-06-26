import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'clinic-information',
  templateUrl: './clinic-information.component.html',
  styleUrls: ['./clinic-information.component.css']
})
export class ClinicInformationComponent implements OnInit {
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
