import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { Casts_CODES_DATA } from './Casts_codes_data.ts';
import { casts } from '../../model/casts';

@Component({
  selector: 'billing-casts-n',
  templateUrl: './casts-n.component.html',
  styleUrls: ['./casts-n.component.css']
})
export class CastsNComponent implements OnInit, OnChanges {
  CastsForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() castsData: casts;

  billingCPTCodeList: BillingCPTCode[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
    this.patchFormData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['castsData'] && this.castsData && this.CastsForm) {
      this.patchFormData();
    }
  }

  patchFormData(): void {
    if (!this.castsData?.codes || !this.CastsForm) return;
    this.castsData.codes.forEach(item => {
      const quantityControl = this.CastsForm.get(item.code);
      const notesControl = this.CastsForm.get(item.code + '_notes');
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

    this.CastsForm = this.fb.group(formControls);
    this.formReady.emit(this.CastsForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = Casts_CODES_DATA;
  }
}
