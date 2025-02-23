import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AggravatingFactors } from '../../../lookups/aggravating.factors';

@Component({
  selector: 'pain',
  templateUrl: './pain.component.html',
  styleUrls: ['./pain.component.css']
})
export class PainComponent implements OnInit {
  painForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  aggravatingFactors: string[] = AggravatingFactors;
  showPainEval: boolean = false
  painScaleList: string[] = []
  painScaleCounter: number = 0;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.painForm = this.fb.group({
      'pain_scale': new FormControl(null, [Validators.required]),
      'aggravating': new FormControl(null, [Validators.required]),
      "restrictions_pain_alleviators": new FormControl(null, [Validators.required]),
    });
    this.handlePainScale();
    this.formReady.emit(this.painForm);
  }

  private handlePainScale() {
    this.painForm.get('pain_scale').valueChanges.subscribe(value => {
      if (value === 'yes') {
        this.painScaleList.push('pscal_' + this.painScaleCounter);
        this.showPainEval = true
      }
      else
        this.showPainEval = false
    })
  }
  addPainScale() {
    this.painScaleList.push('pscal_' + this.painScaleCounter++);
  }
  remove(event: any) {
    this.painScaleList= this.painScaleList.filter(item => item !== event);
  }
}
