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
  constructor(private fb: FormBuilder
    , private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.basicForm = this.fb.group({});
    //this.handleChanges()
    this.formReady.emit(this.basicForm);
  }
  // handleChanges() {
  //   this.basicForm.get('treatment_side_left').valueChanges.subscribe(val => {
  //     if (val)
  //       this.basicForm.get('treatment_side_na').setValue(false)
  //     if (!val && !this.basicForm.get('treatment_side_right').value)
  //       this.basicForm.get('treatment_side_na').setValue(true)

  //   })
  //   this.basicForm.get('treatment_side_right').valueChanges.subscribe(val => {
  //     if (val)
  //       this.basicForm.get('treatment_side_na').setValue(false)
  //     if (!val && !this.basicForm.get('treatment_side_left').value)
  //       this.basicForm.get('treatment_side_na').setValue(true)
  //   })
  // }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
}
