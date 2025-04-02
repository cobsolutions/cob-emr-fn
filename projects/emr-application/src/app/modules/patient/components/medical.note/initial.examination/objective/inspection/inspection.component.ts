import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldDependentsService } from '../../../../../services/medical.note/field.dependents.builder/field-dependents.service';
import { FieldControlStyles } from '../../../filed.control.style.selector/field.control.style';
import { InspectionFormStyles } from './inspection.fields.styles';

@Component({
  selector: 'inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {
  inspectionForm: FormGroup;
  @Input() fields: any
  @Output() formReady = new EventEmitter<FormGroup>();
  styles: FieldControlStyles[] = InspectionFormStyles;
  constructor(private fb: FormBuilder
    , private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.inspectionForm = this.fb.group({});
    this.formReady.emit(this.inspectionForm);
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }

}
