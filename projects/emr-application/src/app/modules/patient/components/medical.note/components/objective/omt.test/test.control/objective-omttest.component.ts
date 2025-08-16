import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OMTTestControl } from '../model/omt.test.control';

@Component({
  selector: 'app-objective-omttest',
  templateUrl: './objective-omttest.component.html',
  styleUrls: ['./objective-omttest.component.css']
})
export class ObjectiveOMTTestComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() parentFieldName;
  omtTestform: FormGroup;
  @Input() layout: 'horizontal' | 'vertical' = 'vertical';
  @Input() controls: OMTTestControl[]
  @Input() testStyle: string
  @Input() testLabelStyle: string
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.omtTestform = this.fb.group({});
    this.controls.forEach(control => {
      this.omtTestform.addControl(control.id, this.fb.control(''));
      this.omtTestform.get(control.id).valueChanges.subscribe(v => {
        this.form.get(this.parentFieldName).setValue(this.getAllFormValues(this.omtTestform));
      })
    })
    setTimeout(() => {
      this.omtTestform.patchValue(this.form.get(this.parentFieldName).value);
    }, 10);
  }
  getAllFormValues(formGroup: FormGroup): any {
    const values: any = {};
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        values[key] = control.value;
      } else if (control instanceof FormGroup) {
        values[key] = this.getAllFormValues(control); // Recursively get values from nested FormGroup
      } else if (control instanceof FormArray) {
        values[key] = control.controls.map(ctrl =>
          ctrl instanceof FormGroup ? this.getAllFormValues(ctrl) : ctrl.value
        );
      }
    });
    return values;
  }

}
