import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldDependentsService } from '../../../../../services/medical.note/field.dependents.builder/field-dependents.service';
import { FieldControlStyles } from '../../../filed.control.style.selector/field.control.style';
import { PriorFunctionStyles } from './styles/prior.function.fields.styles';

@Component({
  selector: 'prior-level-function',
  templateUrl: './prior-level-function.component.html',
  styleUrls: ['./prior-level-function.component.css']
})
export class PriorLevelFunctionComponent implements OnInit {
  priorLevelFunctionForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  styles: FieldControlStyles[] = PriorFunctionStyles;
  @Input() priorLevelFunctionFormData: any
  constructor(private fb: FormBuilder
    , private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.priorLevelFunctionForm = this.fb.group({})
    this.formReady.emit(this.priorLevelFunctionForm);
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}
