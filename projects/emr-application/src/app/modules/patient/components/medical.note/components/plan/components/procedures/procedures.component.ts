import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldDependentsService } from 'projects/emr-application/src/app/modules/patient/services/medical.note/field.dependents.builder/field-dependents.service';
import { FieldControlStyles } from '../../../../filed.control.style.selector/field.control.style';
import { ProceduresStyles } from './styles/procedures';

@Component({
  selector: 'procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {
  proceduresForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  @Input() data:any
  styles: FieldControlStyles[] = ProceduresStyles;
  constructor(private fb: FormBuilder, private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.proceduresForm = this.fb.group({})
    this.formReady.emit(this.proceduresForm);
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}
