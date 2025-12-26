import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { UNTIMED_CODES_DATA } from './untimed-codes.data';

@Component({
  selector: 'billing-untimed-codes-n',
  templateUrl: './untimed-codes-n.component.html',
  styleUrls: ['./untimed-codes-n.component.css']
})
export class UntimedCodesNComponent implements OnInit {
  UntimedCodes: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();

  billingCPTCodeList: BillingCPTCode[] = [];
  checkedCodes: Map<string, boolean> = new Map();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
  }

  loadCPTCodes() {
    this.billingCPTCodeList = UNTIMED_CODES_DATA;
  }

  initForm() {
    const formControls: any = {};

    this.billingCPTCodeList.forEach(code => {
      formControls[code.cpt + '_checked'] = [false];
      formControls[code.cpt + '_notes'] = [''];
      this.checkedCodes.set(code.cpt, false);
    });

    this.UntimedCodes = this.fb.group(formControls);
    this.formReady.emit(this.UntimedCodes);
  }

  onCheckboxChange(cpt: string, event: any) {
    const isChecked = event.target.checked;
    this.checkedCodes.set(cpt, isChecked);
  }

  isChecked(cpt: string): boolean {
    return this.checkedCodes.get(cpt) || false;
  }

}
