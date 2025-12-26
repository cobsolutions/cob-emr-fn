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
    this.initForm();
    this.loadCPTCodes();
  }

  loadCPTCodes() {
    this.billingCPTCodeList = UNTIMED_CODES_DATA;
    this.billingCPTCodeList.forEach(code => {
      this.checkedCodes.set(code.cpt, false);
    });
  }

  initForm() {
    this.UntimedCodes = this.fb.group({});
  }

  onCheckboxChange(cpt: string, event: any) {
    this.checkedCodes.set(cpt, event.target.checked);
  }

  isChecked(cpt: string): boolean {
    return this.checkedCodes.get(cpt) || false;
  }

}
