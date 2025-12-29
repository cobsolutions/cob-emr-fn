import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { RESPIRATORY_CODES_DATA } from './RESPIRATORY_CODES_DATA';

@Component({
  selector: 'billing-respiratory-n',
  templateUrl: './respiratory-n.component.html',
  styleUrls: ['./respiratory-n.component.css']
})
export class RespiratoryNComponent implements OnInit {
  RespiratoryForm: FormGroup;
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
      formControls[code.cpt + '_notes'] = [''];
    });

    this.RespiratoryForm = this.fb.group(formControls);
    this.formReady.emit(this.RespiratoryForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = RESPIRATORY_CODES_DATA;
  }
  hasValue(cpt: string): boolean {
    const value = this.RespiratoryForm.get(cpt)?.value;
    return value && value > 0;
  }
}
