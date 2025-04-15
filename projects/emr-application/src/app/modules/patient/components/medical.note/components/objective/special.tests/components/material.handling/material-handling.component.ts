import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'material-handling',
  templateUrl: './material-handling.component.html',
  styleUrls: ['./material-handling.component.css']
})
export class MaterialHandlingComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() testStyle: string;
  form: FormGroup;
  tasks = [
    'Floor To Knuckle',
    'Knuckle To Shoulder',
    'Shoulder To Overhead',
    '100 FT. Carry And Pivot'
  ];
  adequacyOptions = ['N/A', 'Yes', 'No'];

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.form = this.fb.group({
      lifting: this.fb.group({
        floorToKnuckle: this.fb.group({
          occasional: [''],
          frequent: [''],
          adequate: ['N/A']
        }),
        knuckleToShoulder: this.fb.group({
          occasional: [''],
          frequent: [''],
          adequate: ['N/A']
        }),
        shoulderToOverhead: this.fb.group({
          occasional: [''],
          frequent: [''],
          adequate: ['N/A']
        }),
        carryAndPivot: this.fb.group({
          occasional: [''],
          frequent: [''],
          adequate: ['N/A']
        })
      })
    });
    this.form.valueChanges.subscribe(values => {
      this.parentForm.get(this.parentFieldName).setValue(values);
    });
    setTimeout(() => {
      this.form.patchValue(this.parentForm.get(this.parentFieldName).value);
    }, 10);
  }
  get liftingControls() {
    return (this.form.get('lifting') as FormArray).controls;
  }
  get liftingGroup(): FormGroup {
    return this.form.get('lifting') as FormGroup;
  }
}
