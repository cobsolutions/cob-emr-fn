import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { BRACES_CODES_DATA } from './braces_codes_data';
import { braces } from '../../model/braces';

@Component({
  selector: 'billing-braces-n',
  templateUrl: './braces-n.component.html',
  styleUrls: ['./braces-n.component.css']
})
export class BracesNComponent implements OnInit, OnChanges {

  BracesForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() bracesData: braces;

  billingCPTCodeList: BillingCPTCode[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
    this.patchFormData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bracesData'] && this.bracesData && this.BracesForm) {
      this.patchFormData();
    }
  }

  patchFormData(): void {
    if (!this.bracesData?.codes || !this.BracesForm) return;
    this.bracesData.codes.forEach(item => {
      const quantityControl = this.BracesForm.get(item.code);
      const notesControl = this.BracesForm.get(item.code + '_notes');
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

    this.BracesForm = this.fb.group(formControls);
    this.formReady.emit(this.BracesForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = BRACES_CODES_DATA;
  }
}
