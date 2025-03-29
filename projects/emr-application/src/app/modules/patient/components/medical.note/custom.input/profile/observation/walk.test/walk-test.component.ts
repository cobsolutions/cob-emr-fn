import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'walk-test',
  templateUrl: './walk-test.component.html',
  styleUrls: ['./walk-test.component.css']
})
export class WalkTestComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() parentFieldName;
  wlakTestForm: FormGroup;
  @Input() testStyle:string
  timeIntervals = ['Rest', '1 min.', '2 min.', '3 min.', '4 min.', '5 min.', '6 min.'];
  column: string[] = ['spo2', 'heartRate', 'respiratoryRate', 'borgScale', 'distance'];
  constructor(private fb: FormBuilder) {
  }
  createRecordGroup(time: string): FormGroup {
    return new FormGroup({
      timeInterval: new FormControl(time),
      spo2: new FormControl(''),
      heartRate: new FormControl(''),
      respiratoryRate: new FormControl(''),
      borgScale: new FormControl(''),
      distance: new FormControl('')
    });
  }
  get records(): FormArray<FormGroup> {
    return this.wlakTestForm.get('records') as FormArray<FormGroup>;
  }

  ngOnInit(): void {
    this.wlakTestForm = this.fb.group({
      records: this.fb.array(this.timeIntervals.map((time) => this.createRecordGroup(time)))
    });
    this.wlakTestForm.get('records').valueChanges.subscribe(v => {
      this.form.get(this.parentFieldName).setValue(this.getAllFormValues(this.wlakTestForm));
    })
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
