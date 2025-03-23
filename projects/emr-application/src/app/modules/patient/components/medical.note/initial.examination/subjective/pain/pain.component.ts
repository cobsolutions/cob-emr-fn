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
  painScaleList: string[] = []
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
    });
    if(this.painFormData){
      setTimeout(() => {
        this.painForm.patchValue(this.painFormData);
      }, 10);
    }
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
    this.painScaleList = this.painScaleList.filter(item => item !== event);
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}
