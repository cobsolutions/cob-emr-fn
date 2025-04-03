import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldDependentsService } from '../../../../../services/medical.note/field.dependents.builder/field-dependents.service';
import { FieldControlStyles } from '../../../filed.control.style.selector/field.control.style';
import { StrengthFormStyles } from './strength.fields.styles';

@Component({
  selector: 'strength',
  templateUrl: './strength.component.html',
  styleUrls: ['./strength.component.css']
})
export class StrengthComponent implements OnInit {

  strengthForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  styles: FieldControlStyles[] = StrengthFormStyles;
  constructor(private fb: FormBuilder
    , private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.strengthForm = this.fb.group({});
    this.formReady.emit(this.strengthForm);
  }

  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}
