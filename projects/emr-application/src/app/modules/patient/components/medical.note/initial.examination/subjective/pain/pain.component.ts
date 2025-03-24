import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldDependentsService } from '../../../../../services/medical.note/field.dependents.builder/field-dependents.service';
import { FieldControlStyles } from '../../../filed.control.style.selector/field.control.style';
import { AggravatingFactors } from '../../../lookups/aggravating.factors';
import { PainFormStyles } from './pain.fields.styles';

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
  painScaleCounter: number = 0;
  @Input() fields: any
  styles: FieldControlStyles[] = PainFormStyles;
  @Input() painFormData: any
  constructor(private fb: FormBuilder
    , private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.painForm = this.fb.group({
      'pain_scale': new FormControl(null, [Validators.required]),
      evals: this.fb.array([])
    });
    if (this.painFormData) {
      setTimeout(() => {
        this.painForm.patchValue(this.painFormData);
      }, 10);
    }
    this.handlePainScale();
    if (this.painFormData)
      this.fillEvals();
    this.formReady.emit(this.painForm);
  }

  get evals(): FormArray {
    return this.painForm.get('evals') as FormArray;
  }
  private fillEvals() {
    for (let i = 0; i < this.painFormData?.evals.length; i++) {
      this.evals.push(new FormControl(this.painFormData?.evals))
    }
  }
  private handlePainScale() {
    this.painForm.get('pain_scale').valueChanges.subscribe(value => {
      if (value === 'yes') {
        this.showPainEval = true
      }
      else
        this.showPainEval = false
    })
  }
  save(event: any) {
    this.evals.push(new FormControl(event))
  }
  remove(index: any) {
    this.evals.removeAt(index);
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}
