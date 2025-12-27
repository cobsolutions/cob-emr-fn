import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { OTHERTREATMENTPROCEDURES_CODES_DATA } from '../other-treatment-procedures/OTHERTREATMENTPROCEDURES_CODES_DATA';
import { BRACES_CODES_DATA } from './braces_codes_data';

@Component({
  selector: 'billing-braces-n',
  templateUrl: './braces-n.component.html',
  styleUrls: ['./braces-n.component.css']
})
export class BracesNComponent implements OnInit {

  BracesForm: FormGroup;
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

    this.BracesForm = this.fb.group(formControls);
    this.formReady.emit(this.BracesForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = BRACES_CODES_DATA;
  }
}
