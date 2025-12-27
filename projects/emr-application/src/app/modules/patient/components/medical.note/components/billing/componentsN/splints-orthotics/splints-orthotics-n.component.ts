import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { OTHERTREATMENTPROCEDURES_CODES_DATA } from '../other-treatment-procedures/OTHERTREATMENTPROCEDURES_CODES_DATA';
import { SplintsOrthotics_CODES_DATA } from './SplintsOrthotics_CODES_DATA';

@Component({
  selector: 'billing-splints-orthotics-n',
  templateUrl: './splints-orthotics-n.component.html',
  styleUrls: ['./splints-orthotics-n.component.css']
})
export class SplintsOrthoticsNComponent implements OnInit {

  SplintsOrthoticsForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();

  billingCPTCodeList: BillingCPTCode[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
  }
  initForm() {
    const formControls: any = {};

    this.billingCPTCodeList.forEach(code => {
      formControls[code.cpt] = [0];
    });

    this.SplintsOrthoticsForm = this.fb.group(formControls);
    this.formReady.emit(this.SplintsOrthoticsForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = SplintsOrthotics_CODES_DATA;
  }

}
