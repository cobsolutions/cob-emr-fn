import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldDependentsService } from '../../../../../services/medical.note/field.dependents.builder/field-dependents.service';
import { FieldControlStyles } from '../../../filed.control.style.selector/field.control.style';
import { MedicalHistoryStyles } from './styles/medical.history';
interface MedicalHistory {
  name?: string,
  value?: string
}
@Component({
  selector: 'medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {
  medicalHistoryForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  styles: FieldControlStyles[] = MedicalHistoryStyles;
  @Input() medicalHistoryFormData: any
  constructor(private fb: FormBuilder
    , private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.medicalHistoryForm = this.fb.group({})
    if (this.medicalHistoryFormData) {
      setTimeout(() => {
        this.medicalHistoryForm.patchValue(this.medicalHistoryFormData);
      }, 10);
    }
    this.formReady.emit(this.medicalHistoryForm);
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}
