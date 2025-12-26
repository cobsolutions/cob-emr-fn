import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { DIRECT_TIMED_CODE_CODES_DATA } from './DIRECT_TIMED_CODE_CODES_DATA';

@Component({
  selector: 'billing-direct-timed-code-n',
  templateUrl: './direct-timed-code-n.component.html',
  styleUrls: ['./direct-timed-code-n.component.css']
})
export class DirectTimedCodeNComponent implements OnInit {
  DirectTimedCodeForm: FormGroup;
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

    this.DirectTimedCodeForm = this.fb.group(formControls);
    this.formReady.emit(this.DirectTimedCodeForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = DIRECT_TIMED_CODE_CODES_DATA;
  }

}
