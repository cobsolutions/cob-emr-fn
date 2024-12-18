import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'essential-information',
  templateUrl: './essential-information.component.html',
  styleUrls: ['./essential-information.component.css']
})
export class EssentialInformationComponent implements OnInit {
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }
  esstentialStep() {
  }
}
