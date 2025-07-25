import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'covavg',
  templateUrl: './covavg.component.html',
  styleUrls: ['./covavg.component.css']
})
export class CovavgComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() parentFieldName!: string;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      rightValue1: [''],
      rightValue2: [''],
      rightValue3: [''],
      rightCov: [''],
      rightAvg: [''],
      rightComments: [''],

      leftValue1: [''],
      leftValue2: [''],
      leftValue3: [''],
      leftCov: [''],
      leftAvg: [''],
      leftComments: ['']
    });
    this.form.get('rightValue1')?.valueChanges.subscribe(() => {
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });
    this.form.get('rightValue2')?.valueChanges.subscribe(() => {
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });
    this.form.get('rightValue3')?.valueChanges.subscribe(() => {
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });
    this.form.get('rightCov')?.valueChanges.subscribe(() => {
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });
    this.form.get('rightAvg')?.valueChanges.subscribe(() => {
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });
    this.form.get('rightComments')?.valueChanges.subscribe(() => {
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });


    this.form.get('leftValue1')?.valueChanges.subscribe(() => {
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });
    this.form.get('leftValue2')?.valueChanges.subscribe(() => {
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });
    this.form.get('leftValue3')?.valueChanges.subscribe(() => {
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });
    this.form.get('leftCov')?.valueChanges.subscribe(() => {
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });
    this.form.get('leftAvg')?.valueChanges.subscribe(() => {
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });
    this.form.get('leftComments')?.valueChanges.subscribe(() => {
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });
  }
}
