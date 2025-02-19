import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.css']
})
export class BasicInformationComponent implements OnInit {
  basicForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.basicForm = this.fb.group({
      'init_date': new FormControl(null, [Validators.required]),
      'time_in_out': new FormControl(null, [Validators.required]),
      'number_of_visit': new FormControl(null, [Validators.required]),
      'diagnosis': new FormArray([]),
      'treatment_diagnosis': new FormArray([]),
      'treatment_side': new FormControl(null, [Validators.required]),
      'physician_order': new FormControl(null, [Validators.required]),
      'change_status_date': new FormControl(null, [Validators.required]),

      'chronic': new FormControl(null, [Validators.required]),
      'insidious': new FormControl(null, [Validators.required]),
      'new_injury': new FormControl(null, [Validators.required]),
      'no_new_injury': new FormControl(null, [Validators.required]),

      'surgery_performed': new FormControl(null, [Validators.required]),
      'prior_hospitalization': new FormControl(null, [Validators.required]),

      'mechanism_injury': new FormControl(null, [Validators.required]),
      'chief_complaint': new FormControl(null, [Validators.required]),

    });
    this.formReady.emit(this.basicForm);
  }

}
