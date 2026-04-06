import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { DIRECT_TIMED_CODE_CODES_DATA } from './DIRECT_TIMED_CODE_CODES_DATA';
import { directTimedCodes } from '../../model/directTimedCodes';

@Component({
  selector: 'billing-direct-timed-code-n',
  templateUrl: './direct-timed-code-n.component.html',
  styleUrls: ['./direct-timed-code-n.component.css']
})
export class DirectTimedCodeNComponent implements OnInit, OnChanges {
  DirectTimedCodeForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() directTimedCodesData: directTimedCodes;

  billingCPTCodeList: BillingCPTCode[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
    this.patchFormData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['directTimedCodesData'] && this.directTimedCodesData && this.DirectTimedCodeForm) {
      this.patchFormData();
    }
  }

  patchFormData(): void {
    if (!this.directTimedCodesData?.codes || !this.DirectTimedCodeForm) return;
    this.directTimedCodesData.codes.forEach(item => {
      const quantityControl = this.DirectTimedCodeForm.get(item.code);
      const notesControl = this.DirectTimedCodeForm.get(item.code + '_notes');
      if (quantityControl) {
        quantityControl.setValue(item.quantity || null);
      }
      if (notesControl) {
        notesControl.setValue(item.note || '');
      }
    });
  }

  initForm() {
    const formControls: any = {};

    this.billingCPTCodeList.forEach(code => {
      formControls[code.cpt] = [null];
      formControls[code.cpt + '_notes'] = [''];
    });

    this.DirectTimedCodeForm = this.fb.group(formControls);
    this.formReady.emit(this.DirectTimedCodeForm);
  }

  loadCPTCodes() {
    this.billingCPTCodeList = DIRECT_TIMED_CODE_CODES_DATA;
  }

  hasValue(cpt: string): boolean {
    const value = this.DirectTimedCodeForm.get(cpt)?.value;
    return value && value > 0;
  }

}
