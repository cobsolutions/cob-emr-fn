import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { STRAPPING_CODES_DATA } from './STRAPPING_CODES_DATA';
import { strapping } from '../../model/strapping';

@Component({
  selector: 'billing-strapping-n',
  templateUrl: './strapping-n.component.html',
  styleUrls: ['./strapping-n.component.css']
})
export class StrappingNComponent implements OnInit, OnChanges {
  StrappingForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() strappingData: strapping;

  billingCPTCodeList: BillingCPTCode[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
    this.patchFormData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['strappingData'] && this.strappingData && this.StrappingForm) {
      this.patchFormData();
    }
  }

  patchFormData(): void {
    if (!this.strappingData?.codes || !this.StrappingForm) return;
    this.strappingData.codes.forEach(item => {
      const quantityControl = this.StrappingForm.get(item.code);
      const notesControl = this.StrappingForm.get(item.code + '_notes');
      if (quantityControl) {
        quantityControl.setValue(item.quantity || 0);
      }
      if (notesControl) {
        notesControl.setValue(item.note || '');
      }
    });
  }

  initForm() {
    const formControls: any = {};

    this.billingCPTCodeList.forEach(code => {
      formControls[code.cpt] = [0];
      formControls[code.cpt + '_notes'] = [''];
    });

    this.StrappingForm = this.fb.group(formControls);
    this.formReady.emit(this.StrappingForm);
  }

  loadCPTCodes() {
    this.billingCPTCodeList = STRAPPING_CODES_DATA;
  }

}
