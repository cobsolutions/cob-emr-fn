import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'walk-test',
  templateUrl: './walk-test.component.html',
  styleUrls: ['./walk-test.component.css']
})
export class WalkTestComponent implements OnInit {

  exerciseForm: FormGroup;
  timeIntervals = ['Rest', '1 min.', '2 min.', '3 min.', '4 min.', '5 min.', '6 min.'];

  constructor(private fb: FormBuilder) {
    this.exerciseForm = this.fb.group({
      records: this.fb.array(this.timeIntervals.map(() => this.createRecordGroup()))
    });
  }
  createRecordGroup(): FormGroup {
    return this.fb.group({
      spo2: [''],
      heartRate: [''],
      respiratoryRate: [''],
      borgScale: [''],
      distance: ['']
    });
  }
  get records() {
    return this.exerciseForm.get('records') as FormArray;
  }

  ngOnInit(): void {
  }

}
