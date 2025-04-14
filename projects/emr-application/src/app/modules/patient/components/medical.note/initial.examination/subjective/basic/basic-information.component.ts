import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldDependentsService } from '../../../../../services/medical.note/field.dependents.builder/field-dependents.service';
import { FieldControlStyles } from '../../../filed.control.style.selector/field.control.style';
import { BasicFormStyles } from './fields.styles';
@Component({
  selector: 'basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.css']
})
export class BasicInformationComponent implements OnInit {
  basicForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  treatmentSide: string
  styles: FieldControlStyles[] = BasicFormStyles;
  @Input() basicFormData: any
  constructor(private fb: FormBuilder
    , private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    if (this.basicFormData) {
      // this.basicForm = this.fb.group(this.basicFormData);
      this.basicForm = this.fb.group({});
      setTimeout(() => {
        this.basicForm.patchValue(this.basicFormData);
      }, 10);
    }
    else
      this.basicForm = this.fb.group({});
    this.formReady.emit(this.basicForm);
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}
