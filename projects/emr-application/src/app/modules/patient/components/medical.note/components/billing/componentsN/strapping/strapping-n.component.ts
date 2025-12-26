import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { STRAPPING_CODES_DATA } from './STRAPPING_CODES_DATA';

@Component({
  selector: 'billing-strapping-n',
  templateUrl: './strapping-n.component.html',
  styleUrls: ['./strapping-n.component.css']
})
export class StrappingNComponent implements OnInit {
  StrappingForm: FormGroup;
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

    this.StrappingForm = this.fb.group(formControls);
    this.formReady.emit(this.StrappingForm);
  }

  loadCPTCodes() {
    this.billingCPTCodeList = STRAPPING_CODES_DATA;
  }

}
