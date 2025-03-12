import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldDependentsService } from 'projects/emr-application/src/app/modules/patient/services/medical.note/field.dependents.builder/field-dependents.service';

@Component({
  selector: 'other-treatment-procedures',
  templateUrl: './other-treatment-procedures.component.html',
  styleUrls: ['./other-treatment-procedures.component.css']
})
export class OtherTreatmentProceduresComponent implements OnInit {
  OtherTreatmentProceduresForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  constructor(private fb: FormBuilder, private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.OtherTreatmentProceduresForm = this.fb.group({})
    this.formReady.emit(this.OtherTreatmentProceduresForm);
  }

}
