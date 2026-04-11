import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { RESPIRATORY_CODES_DATA } from './RESPIRATORY_CODES_DATA';
import { respiratory } from '../../model/respiratory';

@Component({
  selector: 'billing-respiratory-n',
  templateUrl: './respiratory-n.component.html',
  styleUrls: ['./respiratory-n.component.css']
})
export class RespiratoryNComponent implements OnInit, OnChanges {
  RespiratoryForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() respiratoryData: respiratory;

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
    if (changes['respiratoryData'] && this.respiratoryData && this.RespiratoryForm) {
      this.patchFormData();
    }
  }

  patchFormData(): void {
    if (!this.respiratoryData?.codes || !this.RespiratoryForm) return;

    this.clearCustomCodes();

    this.respiratoryData.codes.forEach(item => {
      if (item.isCustom) {
        this.addCustomCode({
          name: item.name || '',
          code: item.code || '',
          quantity: item.quantity ?? null,
          note: item.note || ''
        });
        return;
      }

      const quantityControl = this.RespiratoryForm.get(item.code);
      const notesControl = this.RespiratoryForm.get(item.code + '_notes');
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

    this.RespiratoryForm = this.fb.group(formControls);
    this.formReady.emit(this.RespiratoryForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = RESPIRATORY_CODES_DATA;
  }
  hasValue(cpt: string): boolean {
    const value = this.RespiratoryForm.get(cpt)?.value;
    return value && value > 0;
  }

  // ---------------- Custom codes ----------------

  addCustomCode(initial?: { name: string; code: string; quantity: number | null; note: string }): void {
    if (!this.RespiratoryForm) return;

    const id = 'c' + (++this.customCodeCounter);
    this.RespiratoryForm.addControl(this.customControlKey(id, 'name'), new FormControl(initial?.name ?? ''));
    this.RespiratoryForm.addControl(this.customControlKey(id, 'code'), new FormControl(initial?.code ?? ''));
    this.RespiratoryForm.addControl(this.customControlKey(id, 'quantity'), new FormControl(initial?.quantity ?? null));
    this.RespiratoryForm.addControl(this.customControlKey(id, 'notes'), new FormControl(initial?.note ?? ''));

    this.customCodeIds.push(id);
  }

  removeCustomCode(id: string): void {
    if (!this.RespiratoryForm) return;

    const suffixes: Array<'name' | 'code' | 'quantity' | 'notes'> = ['name', 'code', 'quantity', 'notes'];
    suffixes.forEach(suffix => {
      const key = this.customControlKey(id, suffix);
      if (this.RespiratoryForm.contains(key)) {
        this.RespiratoryForm.removeControl(key);
      }
    });

    this.customCodeIds = this.customCodeIds.filter(existing => existing !== id);
  }

  customHasValue(id: string): boolean {
    const value = this.RespiratoryForm?.get(this.customControlKey(id, 'quantity'))?.value;
    return value && value > 0;
  }

  customControlKey(id: string, suffix: 'name' | 'code' | 'quantity' | 'notes'): string {
    return 'custom_' + id + '_' + suffix;
  }

  private clearCustomCodes(): void {
    if (!this.RespiratoryForm) {
      this.customCodeIds = [];
      return;
    }
    Object.keys(this.RespiratoryForm.controls)
      .filter(key => key.startsWith('custom_'))
      .forEach(key => this.RespiratoryForm.removeControl(key));
    this.customCodeIds = [];
  }
}
