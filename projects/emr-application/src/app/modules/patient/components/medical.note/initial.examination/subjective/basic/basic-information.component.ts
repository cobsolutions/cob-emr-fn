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
  treatmentSide: string
  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.basicForm = this.fb.group({
      'init_date': new FormControl(null, [Validators.required]),
      'time_in_out': new FormControl(null, [Validators.required]),
      'number_of_visit': new FormControl(null, [Validators.required]),
      'diagnosis': new FormArray([]),
      'treatment_diagnosis': new FormArray([]),
      'treatment_side_na': new FormControl(true),
      'treatment_side_left': new FormControl(false),
      'treatment_side_right': new FormControl(false),
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
    this.handleChanges()
    this.formReady.emit(this.basicForm);
  }
  handleChanges() {
    this.basicForm.get('treatment_side_left').valueChanges.subscribe(val => {
      if (val)
        this.basicForm.get('treatment_side_na').setValue(false)
      if (!val && !this.basicForm.get('treatment_side_right').value)
        this.basicForm.get('treatment_side_na').setValue(true)

    })
    this.basicForm.get('treatment_side_right').valueChanges.subscribe(val => {
      if (val)
        this.basicForm.get('treatment_side_na').setValue(false)
      if (!val && !this.basicForm.get('treatment_side_left').value)
        this.basicForm.get('treatment_side_na').setValue(true)
    })
  }
}
