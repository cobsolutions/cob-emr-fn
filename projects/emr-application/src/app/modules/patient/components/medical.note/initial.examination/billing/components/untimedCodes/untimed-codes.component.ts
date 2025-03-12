import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldDependentsService } from 'projects/emr-application/src/app/modules/patient/services/medical.note/field.dependents.builder/field-dependents.service';
import { FieldControlStyles } from '../../../../filed.control.style.selector/field.control.style';
import { UntimedCodesStyles } from './styles/untimed.codes';

@Component({
  selector: 'untimed-codes',
  templateUrl: './untimed-codes.component.html',
  styleUrls: ['./untimed-codes.component.css']
})
export class UntimedCodesComponent implements OnInit {
  UntimedCodesForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  @Input() strappingfields : any
  styles: FieldControlStyles[] = UntimedCodesStyles;
  constructor(private fb: FormBuilder, private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.UntimedCodesForm = this.fb.group({})
    this.formReady.emit(this.UntimedCodesForm);
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}
