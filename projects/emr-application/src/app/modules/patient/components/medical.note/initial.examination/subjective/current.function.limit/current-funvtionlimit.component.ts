import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldDependentsService } from '../../../../../services/medical.note/field.dependents.builder/field-dependents.service';
import { FieldControlStyles } from '../../../filed.control.style.selector/field.control.style';
import { CurrentFunctionStyles } from './styles/current.function.fields.styles';

@Component({
  selector: 'current-functionlimit',
  templateUrl: './current-funvtionlimit.component.html',
  styleUrls: ['./current-funvtionlimit.component.css']
})
export class CurrentFunvtionlimitComponent implements OnInit {
  currentFunctionForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  styles: FieldControlStyles[] = CurrentFunctionStyles;
  constructor(private fb: FormBuilder
    , private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.currentFunctionForm = this.fb.group({})
    this.formReady.emit(this.currentFunctionForm);
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }

}
