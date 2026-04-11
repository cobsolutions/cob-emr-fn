import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { DIRECT_TIMED_CODE_CODES_DATA } from './DIRECT_TIMED_CODE_CODES_DATA';
import { directTimedCodes } from '../../model/directTimedCodes';

@Component({
  selector: 'billing-direct-timed-code-n',
  templateUrl: './direct-timed-code-n.component.html',
  styleUrls: ['./direct-timed-code-n.component.css']
})
export class DirectTimedCodeNComponent implements OnInit, OnChanges {
  DirectTimedCodeForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() directTimedCodesData: directTimedCodes;

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
    if (changes['directTimedCodesData'] && this.directTimedCodesData && this.DirectTimedCodeForm) {
      this.patchFormData();
    }
  }

  patchFormData(): void {
    if (!this.directTimedCodesData?.codes || !this.DirectTimedCodeForm) return;

    this.clearCustomCodes();

    this.directTimedCodesData.codes.forEach(item => {
      if (item.isCustom) {
        this.addCustomCode({
          name: item.name || '',
          code: item.code || '',
          quantity: item.quantity ?? null,
          note: item.note || ''
        });
        return;
      }

      const quantityControl = this.DirectTimedCodeForm.get(item.code);
      const notesControl = this.DirectTimedCodeForm.get(item.code + '_notes');
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

    this.DirectTimedCodeForm = this.fb.group(formControls);
    this.formReady.emit(this.DirectTimedCodeForm);
  }

  loadCPTCodes() {
    this.billingCPTCodeList = DIRECT_TIMED_CODE_CODES_DATA;
  }

  hasValue(cpt: string): boolean {
    const value = this.DirectTimedCodeForm.get(cpt)?.value;
    return value && value > 0;
  }

  // ---------------- Custom codes ----------------

  addCustomCode(initial?: { name: string; code: string; quantity: number | null; note: string }): void {
    if (!this.DirectTimedCodeForm) return;

    const id = 'c' + (++this.customCodeCounter);
    this.DirectTimedCodeForm.addControl(this.customControlKey(id, 'name'), new FormControl(initial?.name ?? ''));
    this.DirectTimedCodeForm.addControl(this.customControlKey(id, 'code'), new FormControl(initial?.code ?? ''));
    this.DirectTimedCodeForm.addControl(this.customControlKey(id, 'quantity'), new FormControl(initial?.quantity ?? null));
    this.DirectTimedCodeForm.addControl(this.customControlKey(id, 'notes'), new FormControl(initial?.note ?? ''));

    this.customCodeIds.push(id);
  }

  removeCustomCode(id: string): void {
    if (!this.DirectTimedCodeForm) return;

    const suffixes: Array<'name' | 'code' | 'quantity' | 'notes'> = ['name', 'code', 'quantity', 'notes'];
    suffixes.forEach(suffix => {
      const key = this.customControlKey(id, suffix);
      if (this.DirectTimedCodeForm.contains(key)) {
        this.DirectTimedCodeForm.removeControl(key);
      }
    });

    this.customCodeIds = this.customCodeIds.filter(existing => existing !== id);
  }

  customHasValue(id: string): boolean {
    const value = this.DirectTimedCodeForm?.get(this.customControlKey(id, 'quantity'))?.value;
    return value && value > 0;
  }

  customControlKey(id: string, suffix: 'name' | 'code' | 'quantity' | 'notes'): string {
    return 'custom_' + id + '_' + suffix;
  }

  private clearCustomCodes(): void {
    if (!this.DirectTimedCodeForm) {
      this.customCodeIds = [];
      return;
    }
    Object.keys(this.DirectTimedCodeForm.controls)
      .filter(key => key.startsWith('custom_'))
      .forEach(key => this.DirectTimedCodeForm.removeControl(key));
    this.customCodeIds = [];
  }

}
