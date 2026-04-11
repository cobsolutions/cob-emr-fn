import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
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

  customCodeIds: string[] = [];
  private customCodeCounter = 0;

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

    this.clearCustomCodes();

    this.castsData.codes.forEach(item => {
      if (item.isCustom) {
        this.addCustomCode({
          name: item.name || '',
          code: item.code || '',
          quantity: item.quantity ?? null,
          note: item.note || ''
        });
        return;
      }

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

  // ---------------- Custom codes ----------------

  addCustomCode(initial?: { name: string; code: string; quantity: number | null; note: string }): void {
    if (!this.CastsForm) return;

    const id = 'c' + (++this.customCodeCounter);
    this.CastsForm.addControl(this.customControlKey(id, 'name'), new FormControl(initial?.name ?? ''));
    this.CastsForm.addControl(this.customControlKey(id, 'code'), new FormControl(initial?.code ?? ''));
    this.CastsForm.addControl(this.customControlKey(id, 'quantity'), new FormControl(initial?.quantity ?? null));
    this.CastsForm.addControl(this.customControlKey(id, 'notes'), new FormControl(initial?.note ?? ''));

    this.customCodeIds.push(id);
  }

  removeCustomCode(id: string): void {
    if (!this.CastsForm) return;

    const suffixes: Array<'name' | 'code' | 'quantity' | 'notes'> = ['name', 'code', 'quantity', 'notes'];
    suffixes.forEach(suffix => {
      const key = this.customControlKey(id, suffix);
      if (this.CastsForm.contains(key)) {
        this.CastsForm.removeControl(key);
      }
    });

    this.customCodeIds = this.customCodeIds.filter(existing => existing !== id);
  }

  customControlKey(id: string, suffix: 'name' | 'code' | 'quantity' | 'notes'): string {
    return 'custom_' + id + '_' + suffix;
  }

  private clearCustomCodes(): void {
    if (!this.CastsForm) {
      this.customCodeIds = [];
      return;
    }
    Object.keys(this.CastsForm.controls)
      .filter(key => key.startsWith('custom_'))
      .forEach(key => this.CastsForm.removeControl(key));
    this.customCodeIds = [];
  }
}
