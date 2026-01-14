import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { UNTIMED_CODES_DATA } from './untimed-codes.data';
import { untimedCodes } from '../../model/untimedCodes';

@Component({
  selector: 'billing-untimed-codes-n',
  templateUrl: './untimed-codes-n.component.html',
  styleUrls: ['./untimed-codes-n.component.css']
})
export class UntimedCodesNComponent implements OnInit, OnChanges {
  UntimedCodes: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() untimedCodesData: untimedCodes;

  billingCPTCodeList: BillingCPTCode[] = [];
  checkedCodes: Map<string, boolean> = new Map();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
    this.patchFormData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['untimedCodesData'] && this.untimedCodesData && this.UntimedCodes) {
      this.patchFormData();
    }
  }

  patchFormData(): void {
    if (!this.untimedCodesData?.codes || !this.UntimedCodes) return;
    this.untimedCodesData.codes.forEach(item => {
      const checkedControl = this.UntimedCodes.get(item.code + '_checked');
      const notesControl = this.UntimedCodes.get(item.code + '_notes');
      if (checkedControl) {
             
        const checkValue = item.isCheck ;
        checkedControl.setValue(checkValue);
        this.checkedCodes.set(item.code, item.isCheck || false);
      }
      if (notesControl) {
        notesControl.setValue(item.note || '');
      }
    });
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
