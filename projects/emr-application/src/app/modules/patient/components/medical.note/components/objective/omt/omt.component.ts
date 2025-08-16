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
  @Input() data: any
  styles: FieldControlStyles[] = OMTFormStyles;
  controls: OMTTestControl[] = []
  constructor(private fb: FormBuilder
    , private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.omtForm = this.fb.group({});
    this.formReady.emit(this.omtForm);
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}
