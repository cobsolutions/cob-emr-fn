import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldDependentsService } from 'projects/emr-application/src/app/modules/patient/services/medical.note/field.dependents.builder/field-dependents.service';

@Component({
  selector: 'respiratory',
  templateUrl: './respiratory.component.html',
  styleUrls: ['./respiratory.component.css']
})
export class RespiratoryComponent implements OnInit {
  RespiratoryForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  constructor(private fb: FormBuilder, private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.RespiratoryForm = this.fb.group({})
    this.formReady.emit(this.RespiratoryForm);
  }

}
