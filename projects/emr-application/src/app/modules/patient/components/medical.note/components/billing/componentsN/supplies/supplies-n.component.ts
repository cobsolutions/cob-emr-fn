import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { OTHERTREATMENTPROCEDURES_CODES_DATA } from '../other-treatment-procedures/OTHERTREATMENTPROCEDURES_CODES_DATA';
import { Supplies_CODES_DATA } from './Supplies_CODES_DATA';

@Component({
  selector: 'billing-supplies-n',
  templateUrl: './supplies-n.component.html',
  styleUrls: ['./supplies-n.component.css']
})
export class SuppliesNComponent implements OnInit {
  SuppliesForm: FormGroup;
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

    this.SuppliesForm = this.fb.group(formControls);
    this.formReady.emit(this.SuppliesForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = Supplies_CODES_DATA;
  }

}
