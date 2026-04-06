import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { SplintsOrthotics_CODES_DATA } from './SplintsOrthotics_CODES_DATA';
import { splintsorthotics } from '../../model/splintsorthotics';

@Component({
  selector: 'billing-splints-orthotics-n',
  templateUrl: './splints-orthotics-n.component.html',
  styleUrls: ['./splints-orthotics-n.component.css']
})
export class SplintsOrthoticsNComponent implements OnInit, OnChanges {

  SplintsOrthoticsForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() splintsOrthoticsData: splintsorthotics;

  billingCPTCodeList: BillingCPTCode[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
    this.patchFormData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['splintsOrthoticsData'] && this.splintsOrthoticsData && this.SplintsOrthoticsForm) {
      this.patchFormData();
    }
  }

  patchFormData(): void {
    if (!this.splintsOrthoticsData?.codes || !this.SplintsOrthoticsForm) return;
    this.splintsOrthoticsData.codes.forEach(item => {
      const quantityControl = this.SplintsOrthoticsForm.get(item.code);
      const notesControl = this.SplintsOrthoticsForm.get(item.code + '_notes');
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

    this.SplintsOrthoticsForm = this.fb.group(formControls);
    this.formReady.emit(this.SplintsOrthoticsForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = SplintsOrthotics_CODES_DATA;
  }

}
