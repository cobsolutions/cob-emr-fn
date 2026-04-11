import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
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

  customCodeIds: string[] = [];
  private customCodeCounter = 0;

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

    this.clearCustomCodes();

    this.bracesData.codes.forEach(item => {
      if (item.isCustom) {
        this.addCustomCode({
          name: item.name || '',
          code: item.code || '',
          quantity: item.quantity ?? null,
          note: item.note || ''
        });
        return;
      }

      const quantityControl = this.BracesForm.get(item.code);
      const notesControl = this.BracesForm.get(item.code + '_notes');
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

    this.BracesForm = this.fb.group(formControls);
    this.formReady.emit(this.BracesForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = BRACES_CODES_DATA;
  }

  // ---------------- Custom codes ----------------

  addCustomCode(initial?: { name: string; code: string; quantity: number | null; note: string }): void {
    if (!this.BracesForm) return;

    const id = 'c' + (++this.customCodeCounter);
    this.BracesForm.addControl(this.customControlKey(id, 'name'), new FormControl(initial?.name ?? ''));
    this.BracesForm.addControl(this.customControlKey(id, 'code'), new FormControl(initial?.code ?? ''));
    this.BracesForm.addControl(this.customControlKey(id, 'quantity'), new FormControl(initial?.quantity ?? null));
    this.BracesForm.addControl(this.customControlKey(id, 'notes'), new FormControl(initial?.note ?? ''));

    this.customCodeIds.push(id);
  }

  removeCustomCode(id: string): void {
    if (!this.BracesForm) return;

    const suffixes: Array<'name' | 'code' | 'quantity' | 'notes'> = ['name', 'code', 'quantity', 'notes'];
    suffixes.forEach(suffix => {
      const key = this.customControlKey(id, suffix);
      if (this.BracesForm.contains(key)) {
        this.BracesForm.removeControl(key);
      }
    });

    this.customCodeIds = this.customCodeIds.filter(existing => existing !== id);
  }

  customControlKey(id: string, suffix: 'name' | 'code' | 'quantity' | 'notes'): string {
    return 'custom_' + id + '_' + suffix;
  }

  private clearCustomCodes(): void {
    if (!this.BracesForm) {
      this.customCodeIds = [];
      return;
    }
    Object.keys(this.BracesForm.controls)
      .filter(key => key.startsWith('custom_'))
      .forEach(key => this.BracesForm.removeControl(key));
    this.customCodeIds = [];
  }
}
