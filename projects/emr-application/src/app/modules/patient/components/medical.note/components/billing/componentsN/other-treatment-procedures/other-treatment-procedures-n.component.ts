import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { OTHERTREATMENTPROCEDURES_CODES_DATA } from './OTHERTREATMENTPROCEDURES_CODES_DATA';
import { otherTreatmentProcedures } from '../../model/otherTreatmentProcedures';

@Component({
  selector: 'billing-other-treatment-procedures-n',
  templateUrl: './other-treatment-procedures-n.component.html',
  styleUrls: ['./other-treatment-procedures-n.component.css']
})
export class OtherTreatmentProceduresNComponent implements OnInit, OnChanges {

  OtherTreatmentProceduresForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() otherTreatmentProceduresData: otherTreatmentProcedures;

  billingCPTCodeList: BillingCPTCode[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
    this.patchFormData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['otherTreatmentProceduresData'] && this.otherTreatmentProceduresData && this.OtherTreatmentProceduresForm) {
      this.patchFormData();
    }
  }

  patchFormData(): void {
    if (!this.otherTreatmentProceduresData?.codes || !this.OtherTreatmentProceduresForm) return;
    this.otherTreatmentProceduresData.codes.forEach(item => {
      const quantityControl = this.OtherTreatmentProceduresForm.get(item.code);
      const notesControl = this.OtherTreatmentProceduresForm.get(item.code + '_notes');
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

    this.OtherTreatmentProceduresForm = this.fb.group(formControls);
    this.formReady.emit(this.OtherTreatmentProceduresForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = OTHERTREATMENTPROCEDURES_CODES_DATA;
  }

}
