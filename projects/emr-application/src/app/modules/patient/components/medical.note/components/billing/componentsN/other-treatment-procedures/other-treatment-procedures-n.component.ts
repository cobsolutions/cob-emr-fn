import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { OTHERTREATMENTPROCEDURES_CODES_DATA } from './OTHERTREATMENTPROCEDURES_CODES_DATA';

@Component({
  selector: 'billing-other-treatment-procedures-n',
  templateUrl: './other-treatment-procedures-n.component.html',
  styleUrls: ['./other-treatment-procedures-n.component.css']
})
export class OtherTreatmentProceduresNComponent implements OnInit {

  OtherTreatmentProceduresForm: FormGroup;
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

    this.OtherTreatmentProceduresForm = this.fb.group(formControls);
    this.formReady.emit(this.OtherTreatmentProceduresForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = OTHERTREATMENTPROCEDURES_CODES_DATA;
  }

}
