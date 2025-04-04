import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'child-grip',
  templateUrl: './child-grip.component.html',
  styleUrls: ['./child-grip.component.css']
})
export class ChildGripComponent implements OnInit {
  childGripForm: FormGroup;
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() testStyle: string
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.childGripForm = this.fb.group({
      right: this.fb.group({
        values: this.fb.array([
          new FormControl(''), new FormControl(''), new FormControl('')
        ]),
        cov: [''],
        avg: [''],
        comments: ['']
      }),
      left: this.fb.group({
        values: this.fb.array([
          new FormControl(''), new FormControl(''), new FormControl('')
        ]),
        cov: [''],
        avg: [''],
        comments: ['']
      })
    });
    this.subscribeToValueChanges();
  }
  get rightValues(): FormArray {
    return this.childGripForm.get('right.values') as FormArray;
  }

  get leftValues(): FormArray {
    return this.childGripForm.get('left.values') as FormArray;
  }
  private subscribeToValueChanges() {
    this.rightValues.controls.forEach((control, index) => {
      control.valueChanges.subscribe(value => {
        this.parentForm.get(this.parentFieldName).setValue(this.childGripForm.value);
      });
    });

    this.leftValues.controls.forEach((control, index) => {
      control.valueChanges.subscribe(value => {
        this.parentForm.get(this.parentFieldName).setValue(this.childGripForm.value);
      });
    });

    this.childGripForm.get('right.cov')?.valueChanges.subscribe(value => {
      this.parentForm.get(this.parentFieldName).setValue(this.childGripForm.value);
    });

    this.childGripForm.get('right.avg')?.valueChanges.subscribe(value => {
      this.parentForm.get(this.parentFieldName).setValue(this.childGripForm.value);
    });

    this.childGripForm.get('right.comments')?.valueChanges.subscribe(value => {
      this.parentForm.get(this.parentFieldName).setValue(this.childGripForm.value);
    });

    this.childGripForm.get('left.cov')?.valueChanges.subscribe(value => {
      this.parentForm.get(this.parentFieldName).setValue(this.childGripForm.value);
    });

    this.childGripForm.get('left.avg')?.valueChanges.subscribe(value => {
      this.parentForm.get(this.parentFieldName).setValue(this.childGripForm.value);
    });

    this.childGripForm.get('left.comments')?.valueChanges.subscribe(value => {
      this.parentForm.get(this.parentFieldName).setValue(this.childGripForm.value);
    });
  }
}
