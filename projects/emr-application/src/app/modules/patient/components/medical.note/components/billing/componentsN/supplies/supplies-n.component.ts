import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { Supplies_CODES_DATA } from './Supplies_CODES_DATA';
import { supplies } from '../../model/supplies';

@Component({
  selector: 'billing-supplies-n',
  templateUrl: './supplies-n.component.html',
  styleUrls: ['./supplies-n.component.css']
})
export class SuppliesNComponent implements OnInit, OnChanges {
  SuppliesForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() suppliesData: supplies;

  billingCPTCodeList: BillingCPTCode[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
    this.patchFormData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['suppliesData'] && this.suppliesData && this.SuppliesForm) {
      this.patchFormData();
    }
  }

  patchFormData(): void {
    if (!this.suppliesData?.codes || !this.SuppliesForm) return;
    this.suppliesData.codes.forEach(item => {
      const quantityControl = this.SuppliesForm.get(item.code);
      const notesControl = this.SuppliesForm.get(item.code + '_notes');
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

    this.SuppliesForm = this.fb.group(formControls);
    this.formReady.emit(this.SuppliesForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = Supplies_CODES_DATA;
  }

}
