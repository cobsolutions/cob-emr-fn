import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldDependentsService } from '../../../../../services/medical.note/field.dependents.builder/field-dependents.service';
import { FieldControlStyles } from '../../../filed.control.style.selector/field.control.style';
import { OMTTestControl } from '../omt.test/model/omt.test.control';
import { OMTFormStyles } from './omt.fields.styles';

@Component({
  selector: 'omt',
  templateUrl: './omt.component.html',
  styleUrls: ['./omt.component.css']
})
export class OmtComponent implements OnInit {
  omtForm: FormGroup;
  @Input() fields: any
  @Output() formReady = new EventEmitter<FormGroup>();
  styles: FieldControlStyles[] = OMTFormStyles;
  controls: OMTTestControl[] = []
  constructor(private fb: FormBuilder
    , private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.omtForm = this.fb.group({});
    this.formReady.emit(this.omtForm);
    this.test();
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
  private test() {
    var c1: OMTTestControl = {
      name: ['Total %'],
      id: 'shoulder_pain_and_disability_index_total',
      style: 'width:100px',
      type: 'input',
    }
    var c2: OMTTestControl = {
      name: ['Pain %'],
      id: 'shoulder_pain_and_disability_index_pain',
      style: 'width:100px',
      type: 'input',
    }
    var c3: OMTTestControl = {
      name: ['Disability  %'],
      id: 'shoulder_pain_and_disability_index_disability',
      style: 'width:100px',
      type: 'input',
    }
    this.controls.push(c1);
    this.controls.push(c2);
    this.controls.push(c3);
  }
}
