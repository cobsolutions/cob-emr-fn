import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'special-tests-right-left-check',
  templateUrl: './special-tests-right-left-check.component.html',
  styleUrls: ['./special-tests-right-left-check.component.css']
})
export class SpecialTestsRightLeftCheckComponent implements OnInit {
  form: FormGroup
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() testStyle: string;
  @Input() topSelect: string[];
  @Input() mobilityOptions = [
    'Normal',
    'Hypermobile',
    'Hypomobile',
    'Capsular',
    'Non Capsular',
    'Painful'
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const rightControls = {};
    const leftControls = {};

    this.mobilityOptions.forEach(option => {
      const key = this.formatKey(option);
      rightControls['right_' + key] = this.fb.control(false);
      leftControls['left_' + key] = this.fb.control(false);
    });

    this.form = this.fb.group({
      ...rightControls,
      ...leftControls
    });
    this.form.valueChanges.subscribe(values => {
      this.parentForm.get(this.parentFieldName).setValue(values);
    });
    setTimeout(() => {
      this.form.patchValue(this.parentForm.get(this.parentFieldName).value);
    }, 10);
  }
  formatKey(label: string): string {
    return label.toLowerCase().replace(/\s+/g, '_');
  }
}
