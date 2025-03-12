import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldDependentsService } from 'projects/emr-application/src/app/modules/patient/services/medical.note/field.dependents.builder/field-dependents.service';

@Component({
  selector: 'supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent implements OnInit {

  SuppliesForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  constructor(private fb: FormBuilder, private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.SuppliesForm = this.fb.group({})
    this.formReady.emit(this.SuppliesForm);
  }

}
