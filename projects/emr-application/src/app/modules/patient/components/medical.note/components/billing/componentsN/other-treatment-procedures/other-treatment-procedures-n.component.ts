import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
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

  customCodeIds: string[] = [];
  private customCodeCounter = 0;

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

    this.clearCustomCodes();

    this.otherTreatmentProceduresData.codes.forEach(item => {
      if (item.isCustom) {
        this.addCustomCode({
          name: item.name || '',
          code: item.code || '',
          quantity: item.quantity ?? null,
          note: item.note || ''
        });
        return;
      }

      const quantityControl = this.OtherTreatmentProceduresForm.get(item.code);
      const notesControl = this.OtherTreatmentProceduresForm.get(item.code + '_notes');
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

    this.OtherTreatmentProceduresForm = this.fb.group(formControls);
    this.formReady.emit(this.OtherTreatmentProceduresForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = OTHERTREATMENTPROCEDURES_CODES_DATA;
  }

  // ---------------- Custom codes ----------------

  addCustomCode(initial?: { name: string; code: string; quantity: number | null; note: string }): void {
    if (!this.OtherTreatmentProceduresForm) return;

    const id = 'c' + (++this.customCodeCounter);
    this.OtherTreatmentProceduresForm.addControl(this.customControlKey(id, 'name'), new FormControl(initial?.name ?? ''));
    this.OtherTreatmentProceduresForm.addControl(this.customControlKey(id, 'code'), new FormControl(initial?.code ?? ''));
    this.OtherTreatmentProceduresForm.addControl(this.customControlKey(id, 'quantity'), new FormControl(initial?.quantity ?? null));
    this.OtherTreatmentProceduresForm.addControl(this.customControlKey(id, 'notes'), new FormControl(initial?.note ?? ''));

    this.customCodeIds.push(id);
  }

  removeCustomCode(id: string): void {
    if (!this.OtherTreatmentProceduresForm) return;

    const suffixes: Array<'name' | 'code' | 'quantity' | 'notes'> = ['name', 'code', 'quantity', 'notes'];
    suffixes.forEach(suffix => {
      const key = this.customControlKey(id, suffix);
      if (this.OtherTreatmentProceduresForm.contains(key)) {
        this.OtherTreatmentProceduresForm.removeControl(key);
      }
    });

    this.customCodeIds = this.customCodeIds.filter(existing => existing !== id);
  }

  customControlKey(id: string, suffix: 'name' | 'code' | 'quantity' | 'notes'): string {
    return 'custom_' + id + '_' + suffix;
  }

  private clearCustomCodes(): void {
    if (!this.OtherTreatmentProceduresForm) {
      this.customCodeIds = [];
      return;
    }
    Object.keys(this.OtherTreatmentProceduresForm.controls)
      .filter(key => key.startsWith('custom_'))
      .forEach(key => this.OtherTreatmentProceduresForm.removeControl(key));
    this.customCodeIds = [];
  }
}
