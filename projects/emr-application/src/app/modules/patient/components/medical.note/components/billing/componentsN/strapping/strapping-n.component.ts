import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  // Ids of custom codes rendered in the template. Each id maps to 4 form
  // controls: custom_<id>_name, custom_<id>_code, custom_<id>_quantity, custom_<id>_notes.
  customCodeIds: string[] = [];
  private customCodeCounter = 0;

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

    this.clearCustomCodes();

    this.strappingData.codes.forEach(item => {
      if (item.isCustom) {
        this.addCustomCode({
          name: item.name || '',
          code: item.code || '',
          quantity: item.quantity ?? null,
          note: item.note || ''
        });
        return;
      }

      const quantityControl = this.StrappingForm.get(item.code);
      const notesControl = this.StrappingForm.get(item.code + '_notes');
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

    this.StrappingForm = this.fb.group(formControls);
    this.formReady.emit(this.StrappingForm);
  }

  loadCPTCodes() {
    this.billingCPTCodeList = STRAPPING_CODES_DATA;
  }

  // ---------------- Custom codes ----------------

  addCustomCode(initial?: { name: string; code: string; quantity: number | null; note: string }): void {
    if (!this.StrappingForm) return;

    const id = 'c' + (++this.customCodeCounter);
    this.StrappingForm.addControl(this.customControlKey(id, 'name'), new FormControl(initial?.name ?? ''));
    this.StrappingForm.addControl(this.customControlKey(id, 'code'), new FormControl(initial?.code ?? ''));
    this.StrappingForm.addControl(this.customControlKey(id, 'quantity'), new FormControl(initial?.quantity ?? null));
    this.StrappingForm.addControl(this.customControlKey(id, 'notes'), new FormControl(initial?.note ?? ''));

    this.customCodeIds.push(id);
  }

  removeCustomCode(id: string): void {
    if (!this.StrappingForm) return;

    const suffixes: Array<'name' | 'code' | 'quantity' | 'notes'> = ['name', 'code', 'quantity', 'notes'];
    suffixes.forEach(suffix => {
      const key = this.customControlKey(id, suffix);
      if (this.StrappingForm.contains(key)) {
        this.StrappingForm.removeControl(key);
      }
    });

    this.customCodeIds = this.customCodeIds.filter(existing => existing !== id);
  }

  customControlKey(id: string, suffix: 'name' | 'code' | 'quantity' | 'notes'): string {
    return 'custom_' + id + '_' + suffix;
  }

  private clearCustomCodes(): void {
    if (!this.StrappingForm) {
      this.customCodeIds = [];
      return;
    }
    Object.keys(this.StrappingForm.controls)
      .filter(key => key.startsWith('custom_'))
      .forEach(key => this.StrappingForm.removeControl(key));
    this.customCodeIds = [];
  }
}
