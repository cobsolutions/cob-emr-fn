import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldDependentsService } from 'projects/emr-application/src/app/modules/patient/services/medical.note/field.dependents.builder/field-dependents.service';

@Component({
  selector: 'direct-timed-codes',
  templateUrl: './direct-timed-codes.component.html',
  styleUrls: ['./direct-timed-codes.component.css']
})
export class DirectTimedCodesComponent implements OnInit {
  DirectTimedCodesForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() fields: any
  @Input() directTimedCodesData: any
  constructor(private fb: FormBuilder, private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    this.DirectTimedCodesForm = this.fb.group({})
    this.formReady.emit(this.DirectTimedCodesForm);
    if (this.directTimedCodesData)
    setTimeout(() => {
      this.DirectTimedCodesForm.patchValue(this.directTimedCodesData);
    }, 10);
  }


}
