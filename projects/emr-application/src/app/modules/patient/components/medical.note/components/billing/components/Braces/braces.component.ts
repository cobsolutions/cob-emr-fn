import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldDependentsService } from 'projects/emr-application/src/app/modules/patient/services/medical.note/field.dependents.builder/field-dependents.service';

@Component({
  selector: 'braces',
  templateUrl: './braces.component.html',
  styleUrls: ['./braces.component.css']
})
export class BracesComponent implements OnInit {
  BracesForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  @Input() bracesData: any
  constructor(private fb: FormBuilder, private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.BracesForm = this.fb.group({})
    if (this.bracesData)
      setTimeout(() => {
        this.BracesForm.patchValue(this.bracesData);
      }, 10);
    this.formReady.emit(this.BracesForm);
  }

}
