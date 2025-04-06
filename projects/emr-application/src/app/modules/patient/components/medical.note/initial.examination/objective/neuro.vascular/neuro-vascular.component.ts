import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldDependentsService } from '../../../../../services/medical.note/field.dependents.builder/field-dependents.service';
import { FieldControlStyles } from '../../../filed.control.style.selector/field.control.style';
import { NeuroVascularStyles } from './neuro.vascular.styles';

@Component({
  selector: 'app-neuro-vascular',
  templateUrl: './neuro-vascular.component.html',
  styleUrls: ['./neuro-vascular.component.css']
})
export class NeuroVascularComponent implements OnInit {
  neuroVascularForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  styles: FieldControlStyles[] = NeuroVascularStyles;
  constructor(private fb: FormBuilder
    , private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.neuroVascularForm = this.fb.group({});
    this.formReady.emit(this.neuroVascularForm);
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }

}
