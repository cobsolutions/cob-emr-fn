import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { OTHERTREATMENTPROCEDURES_CODES_DATA } from '../other-treatment-procedures/OTHERTREATMENTPROCEDURES_CODES_DATA';
import { Casts_CODES_DATA } from './Casts_codes_data.ts';

@Component({
  selector: 'billing-casts-n',
  templateUrl: './casts-n.component.html',
  styleUrls: ['./casts-n.component.css']
})
export class CastsNComponent implements OnInit {
  CastsForm: FormGroup;
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

    this.CastsForm = this.fb.group(formControls);
    this.formReady.emit(this.CastsForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = Casts_CODES_DATA;
  }
}
