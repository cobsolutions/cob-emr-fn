import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { NERVECONDUCTIONSTUDIES_CODES_DATA } from './NERVECONDUCTIONSTUDIES_CODES_DATA';

@Component({
  selector: 'billing-nerve-conduction-studies-n',
  templateUrl: './nerve-conduction-studies-n.component.html',
  styleUrls: ['./nerve-conduction-studies-n.component.css']
})
export class NerveConductionStudiesNComponent implements OnInit {
  NerveConductionStudiesForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();

  billingCPTCodeList: BillingCPTCode[] = [];
  checkedCodes: Map<string, boolean> = new Map();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
  }
  initForm() {
    const formControls: any = {};

    this.billingCPTCodeList.forEach(code => {
      formControls[code.cpt + '_checked'] = [false];
      formControls[code.cpt + '_notes'] = [''];
      this.checkedCodes.set(code.cpt, false);
    });

    this.NerveConductionStudiesForm = this.fb.group(formControls);
    this.formReady.emit(this.NerveConductionStudiesForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = NERVECONDUCTIONSTUDIES_CODES_DATA;
  }
  onCheckboxChange(cpt: string, event: any) {
    const isChecked = event.target.checked;
    this.checkedCodes.set(cpt, isChecked);
  }

  isChecked(cpt: string): boolean {
    return this.checkedCodes.get(cpt) || false;
  }
}
