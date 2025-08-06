import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldDependentsService } from 'projects/emr-application/src/app/modules/patient/services/medical.note/field.dependents.builder/field-dependents.service';

@Component({
  selector: 'splints-orthotics',
  templateUrl: './splints-orthotics.component.html',
  styleUrls: ['./splints-orthotics.component.css']
})
export class SplintsOrthoticsComponent implements OnInit {
  SplintsOrthoticsForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  @Input() SplintsOrthoticsData: any
  constructor(private fb: FormBuilder, private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.SplintsOrthoticsForm = this.fb.group({})
    if (this.SplintsOrthoticsData)
    setTimeout(() => {
      this.SplintsOrthoticsForm.patchValue(this.SplintsOrthoticsData);
    }, 10);
    this.formReady.emit(this.SplintsOrthoticsForm);
  }
}
